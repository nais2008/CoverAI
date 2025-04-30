import django.db.models
from django.utils.translation import gettext_lazy as _

import apps.core.models

__all__ = ["News"]


class News(
    apps.core.models.BaseImageModel,
):
    title = django.db.models.TextField(
        _("Title news"),
        help_text=_("Write title news"),
        max_length=250,
    )
    description = django.db.models.TextField(
        _("Description news"),
        help_text=_("Write description news"),
        max_length=500,
    )

    class Meta:
        verbose_name = _("news")
        verbose_name_plural = _("news")

    def __str__(self):
        if len(self.title) >= 15:
            return self.title[:15] + "..."

        return self.title
