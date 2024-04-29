from django.core.management.base import BaseCommand

# from django_print_sql import print_sql_decorator, print_sql

from workprogramsapp.models import (
    AcademicPlan,
)


class Command(BaseCommand):
    help = "Closes the specified poll for voting"

    def handle(self, *args, **options):
        with print_sql(count_only=False):
            AcademicPlan.objects.get(id=7304).get_all_changeblocks_from_ap()
