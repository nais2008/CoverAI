from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

__all__ = ["UsersConfig"]


class UsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.users"
    verbose_name = _("Пользователь")
