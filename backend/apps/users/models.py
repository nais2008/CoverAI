import django.contrib.auth.models
import django.db.models
from django.utils.translation import gettext_lazy as _

import apps.core.models
import apps.users.email_normalizer
import apps.users.managers

__all__ = ["User"]

normalizer = apps.users.email_normalizer.EmailNormalizer()


class User(
    django.contrib.auth.models.AbstractUser,
    apps.core.models.BaseImageModel,
):
    email = django.db.models.EmailField(
        _("email address"),
        unique=True,
        null=False,
        blank=False,
        help_text=_("Unique email address"),
    )
    attempts_count = django.db.models.PositiveIntegerField(
        verbose_name=_("attempts count"),
        default=0,
    )
    block_date = django.db.models.DateTimeField(
        verbose_name=_("block date"),
        blank=True,
        null=True,
    )

    objects = apps.users.managers.UserManager()

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        if len(self.username) >= 15:
            return self.username[:15] + "..."

        return self.username
