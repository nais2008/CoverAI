import uuid

import django.db.models
from django.utils.translation import gettext_lazy as _
import sorl.thumbnail

__all__ = ["BaseImageModel", "BaseCreateModel"]


class BaseImageModel(django.db.models.Model):
    def upload_to_path(self, filename):
        new_filename = f"{uuid.uuid4()}.{filename.split('.')[-1]}"
        return (
            f"uploads/{self.__class__.__name__.lower()}"
            f"/{uuid.uuid4()}/{new_filename}"
        )

    def get_image_300x300(self):
        return sorl.thumbnail.get_thumbnail(
            self.image,
            "300x300",
            crop="center",
            quality=51,
        )

    @property
    def get_image_50x50(self):
        return sorl.thumbnail.get_thumbnail(
            self.image,
            "50x50",
            crop="center",
            quality=51,
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


class BaseCreateModel(django.db.models.Model):
    created_at = django.db.models.DateTimeField(
        _("created at"),
        auto_now_add=True,
        help_text=_("Date and time created"),
    )

    class Meta:
        abstract = True
