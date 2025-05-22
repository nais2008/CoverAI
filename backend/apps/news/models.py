import django.db.models
from django.utils.translation import gettext_lazy as _
import django.utils.safestring
import tinymce.models

import apps.core.models
import apps.news.managers

__all__ = ["News", "Image"]


class News(apps.core.models.BaseCreateModel):
    title = django.db.models.TextField(
        _("Title news"),
        help_text=_("Write title news"),
        max_length=250,
    )
    description = tinymce.models.HTMLField(
        _("Description news"),
        help_text=_("Write description news"),
        max_length=500,
    )

    objects = apps.news.managers.NewsManager()

    class Meta:
        verbose_name = _("news")
        verbose_name_plural = _("news")

    def __str__(self):
        if len(self.title) >= 15:
            return self.title[:15] + "..."

        return self.title

    def image_tmb(self):
        if self.image:
            return django.utils.safestring.mark_safe(
                f"<img src='{self.image.get_image_50x50.url}' />",
            )

        return _("No image or image not found")

    image_tmb.short_description = "превью"
    image_tmb.allow_tags = True



class Image(apps.core.models.BaseImageModel):
    news = django.db.models.OneToOneField(
        News,
        on_delete=django.db.models.CASCADE,
        related_name="image",
        null=True,
        default=None,
    )

    class Meta:
        verbose_name = _("main image news")
        verbose_name_plural = _("main images news")

    def __str__(self):
        return self.image.url
