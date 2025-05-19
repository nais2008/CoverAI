import django.apps

__all__ = ["ApiConfig"]


class ApiConfig(django.apps.AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.api"
    verbose_name = "api"
