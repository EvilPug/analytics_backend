from django.core.management.base import BaseCommand, CommandError

from dataprocessing.models import User
from workprogramsapp.expertise.models import Expertise, UserExpertise
from workprogramsapp.models import DisciplineBlockModule


class Command(BaseCommand):

    def handle(self, *args, **options):
        wp_isu_id_list = ['831', '2264', '2810', '3065', '3175', '3511', '5732', '5733', '5895', '6460', '6461', '6462',
                          '6614', '6615', '6631', '7057', '7130', '7957', '8317', '8348', '8360', '8371', '8992',
                          '8993', '8994', '8995', '9326', '9331', '9410', '12133', '12186', '16413', '16415', '16416',
                          '16418', '16419', '16423', '16424', '16425', '16426', '16427', '16428', '16429', '16432',
                          '16434', '16437', '16440', '16447', '16449', '16450', '16453', '16454', '16456', '16457',
                          '16458', '16460', '16461', '16462', '16463', '16464', '16465', '16466', '16468', '16469',
                          '16470', '16472', '16473', '16474', '16476', '16477', '16478', '16539', '16540', '16541',
                          '16542', '16543', '16544', '16550', '16559', '16559', '16560', '16568', '16569', '16911',
                          '17150', '17151', '17225', '17256', '17574', '18137', '18250', '18251', '18260', '18813',
                          '18814', '18815', '18817', '18910', '18911', '19039', '19166', '19742', '19743', '19745',
                          '19747', '19765', '19769', '19843', '19847', '19851', '19899', '19903', '19905', '19908',
                          '19983', '19988', '19993', '19994', '20023', '20033', '20090', '20093', '20129', '20251',
                          '20397', '20485', '21011', '21012', '21013', '21014', '21028', '21029', '21030', '21031',
                          '21032', '21034', '21035', '21037', '21038', '21041', '21042', '21043', '21045', '21047',
                          '21052', '21053', '21061', '21137', '21159', '21160', '21161', '21162', '21163', '21164',
                          '21280', '21292', '21293', '21363', '21364', '21365', '21366', '21367', '21495', '21496',
                          '21497', '21787', '21789', '21791', '21792', '21795', '21799', '21803', '21804', '21805',
                          '21806', '21807', '21808', '21846', '29109', '29110', '29112', '29115', '29116', '29117',
                          '29118', '29119', '29124', '29650', '29867', '30033', '30034', '30035', '30036', '30037',
                          '30038', '30169', '30170', '30171', '30172', '30173', '30174', '30175', '30176', '30177',
                          '30178', '30179', '30180', '30181', '30182', '30183', '30185', '30186', '30187', '30188',
                          '30189', '30190', '30191', '30192', '30193', '30194', '30195', '30196', '30204', '30205',
                          '30206', '30209', '30210', '30211', '30273', '30274', '30276', '30277', '30278', '30279',
                          '30280', '30281', '30282', '30283', '30284', '30287', '30331', '30336', '30416', '30417',
                          '30426', '30435', '30437', '30438', '30485', '30498', '30546', '30547', '30548', '30549',
                          '30550', '30551', '30552', '30567', '30569', '30571', '30681', '30743', '30778', '30790',
                          '30812', '30857', '30959', '31168', '31169', '31170', '31171', '31172', '31174', '31280',
                          '31281', '31282', '31283', '31318', '31319', '31320', '31445', '31446', '31447', '31448',
                          '31449', '31450', '31451', '31452', '31768', '31884', '31893', '31896', '31907', '31927',
                          '31932', '32089', '32115', '32116', '32501']
        isu_user_id = [190319, 29584, 285902]
        for isu_id in wp_isu_id_list:
            try:
                expertise = Expertise.objects.get(work_program__discipline_code=isu_id)
                for isu_user in isu_user_id:
                    user = User.objects.get(username=str(isu_user))
                    UserExpertise.objects.create(expertise=expertise, expert=user)
            except Expertise.DoesNotExist:
                continue
        print("done")
