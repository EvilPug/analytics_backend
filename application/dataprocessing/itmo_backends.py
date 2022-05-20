import requests
from rest_framework.generics import ListAPIView
from django.conf import settings
from django.http import HttpResponseRedirect
import json
import hashlib
from django.contrib.auth import get_user_model
# TODO: Подумать над реализацией авторизации
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import Group

class GetAuthenticationCodeISU(ListAPIView):
    permission_classes = [AllowAny]

    def get(self, request):

        cas_auth_uri = (
            'https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/auth?'
                        'response_type=code&'
                        f'client_id={settings.ISU["ISU_CLIENT_ID"]}&'
                        f'redirect_uri={settings.ISU["ISU_REDIRECT_URI"]}&'
                        f'scope=profile'
                        )
        #print('AuthCode: ', cas_auth_uri.json)
        return HttpResponseRedirect(cas_auth_uri)

class  AuthenticateByCodeISU(ListAPIView):
    permission_classes = [AllowAny]

    def get(self, request):

        # Забираем код авторизации из GET параметра
        authorization_code = request.GET['code']
        print('authorization_code: ', authorization_code)
        obtain_isu_url = requests.post(
            'https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/token', # params = {'code':{authorization_code}},
            data = {'grant_type':'authorization_code', 'client_id':f'{settings.ISU["ISU_CLIENT_ID"]}',
                    'client_secret':f'{settings.ISU["ISU_CLIENT_SECRET"]}', 'redirect_uri':f'{settings.ISU["ISU_REDIRECT_URI"]}',
                    'code':{authorization_code}}
        )
        # Отправляем запрос на получение токена
        obtain_isu = obtain_isu_url.json()
        # print('code url', requests.post(
        #     'https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/token?'
        #     'grant_type=authorization_code&'
        #     f'client_id={settings.ISU["ISU_CLIENT_ID"]}&'
        #     f'client_secret={settings.ISU["ISU_CLIENT_SECRET"]}&'
        #     f'code={authorization_code}&'
        #     f'redirect_uri={settings.ISU["ISU_REDIRECT_URI"]}'
        #     ).url)
        print('url: ', obtain_isu_url.url)
        print('form_data: ', obtain_isu_url.request.body)
        print('headers: ', obtain_isu_url.request.headers)
        print('code obtained', print(obtain_isu))

        # Проверяем правильный ли ответ от ИСУ
        if 'access_token' in obtain_isu:
            print('styrt obtained')
            # Получаем информацию о пользователе
            isu_profile = requests.get(
                'https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/userinfo?', headers = {'Authorization': f'Bearer {obtain_isu["access_token"]}'}
            ).json()
            print('profile obtained')
            print('profile obtained, user_profile', isu_profile)

            User = get_user_model()

            # Из чего будем собирать пароль
            password_rule = (
                f'{isu_profile["isu"]}'
                f'{isu_profile["given_name"]}'
                ).encode('utf-8')

            password = hashlib.sha256(password_rule).hexdigest()

            # Проверяем есть ли пользователь в системе
            is_registered = User.objects.filter(username=isu_profile['isu']).exists()

            # Если пользователя нет, то регистрируем
            if not is_registered:
                #reg = True
                User.objects.create_user(
                    username=isu_profile['isu'],
                    password=password,
                    first_name=isu_profile['given_name'],
                    last_name=isu_profile['family_name'],
                    isu_number=isu_profile['isu'],
                    is_active=True

                )

                try:
                    User.objects.patronymic=isu_profile['patronymic']
                except:
                    pass

            #if reg:
                # print(isu_profile['groups'])
                # if "/SOTRUDNIK" in isu_profile['groups']:
                #     groups = ["rpd_developer", "student"]
                #     # "education_plan_developer", "op_leader",
                #     User = User.objects.get(username=isu_profile['id'])
                #     for group in groups:
                #         User.groups.add(Group.objects.get(name=group))
                # elif "/STUDENT" in isu_profile['groups']:
                #     groups = ["student"]
                #     User = User.objects.get(username=isu_profile['id'])
                #     for group in groups:
                #         User.groups.add(Group.objects.get(name=group))
                # else:
                #     pass
                groups = ["rpd_developer", "education_plan_developer", "op_leader", "student"]
                User = User.objects.get(username=isu_profile['isu'])
                for group in groups:
                    User.groups.add(Group.objects.get(name=group))

            # Авторизация
            User = get_user_model()
            user = User.objects.get(username=isu_profile['isu'])
            refresh_token = TokenObtainPairSerializer().get_token(user)
            access_token = AccessToken().for_user(user)
            print('Юзер авторизован')

            return HttpResponseRedirect(f'{settings.ISU["ISU_FINISH_URI"]}/{access_token}/{refresh_token}')


def isu_client_credentials_request(url):
    obtain_isu_url = requests.post(
        'https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/token',
        data={'grant_type': 'client_credentials',
              'client_id': f'{settings.ISU["ISU_CLIENT_ID"]}',
              'client_secret': f'{settings.ISU["ISU_CLIENT_SECRET"]}'})
    obtain_isu = obtain_isu_url.json()
    if 'access_token' in obtain_isu:
        print(url)
        req = requests.post(url, headers={'Authorization': 'Bearer ' + obtain_isu['access_token']})
        print(req)
        print('сработало')
