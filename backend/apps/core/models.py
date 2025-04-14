import uuid

import django.db.models
from django.utils.translation import gettext_lazy as _

__all__ = ["BaseImageModel"]


class BaseImageModel(django.db.models.Model):
    def upload_to_path(self, filename):
        new_filename = f"{uuid.uuid4()}.{filename.split('.')[-1]}"
        return (
            f"uploads/{self.__class__.__name__.lower()}"
            f"/{uuid.uuid4()}/{new_filename}"
        )

    image = django.db.models.ImageField(
        verbose_name=_("image/avatar"),
        help_text=_("Note image/profile avatar"),
        upload_to=upload_to_path,
        null=True,
        blank=True,
    )

    class Meta:
        abstract = True
