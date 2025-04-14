from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

__all__ = ["NewsConfig"]


class NewsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.news"
    verbose_name = _("Новость")
