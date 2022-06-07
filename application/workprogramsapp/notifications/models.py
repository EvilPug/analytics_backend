from django.db import models

from workprogramsapp.expertise.models import Expertise, ExpertiseComments
from workprogramsapp.models import Topic, WorkProgram
from django.conf import settings


class UserNotification(models.Model):
    """
    Базовый класс нотификаций
    """
    status_choices = (
        ('read', 'read'),
        ('unread', 'unread'),
    )
    status = models.CharField(max_length=30, choices=status_choices, verbose_name='Статус нотификации',
                              default='unread')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    message = models.CharField(max_length=4096, verbose_name="Сообщение нотификации", blank=True, null=True)
    notification_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        ordering = ('-notification_date',)


class ExpertiseNotification(UserNotification):
    """
    Нотификации об экспертизе
    """
    expertise = models.ForeignKey(Expertise, on_delete=models.CASCADE, blank=True, null=True)


class AcademicPlanUpdateNotification(UserNotification):
    """
    Нотификации об обновлениях в учебном плане
    """
    expertise = models.ForeignKey(Expertise, on_delete=models.CASCADE, blank=True, null=True)



class NotificationComments(UserNotification):
    comment_new = models.ForeignKey(ExpertiseComments, on_delete=models.CASCADE, blank=True, null=True)

