import django.contrib.admin

import apps.news.models

__all__ = ()


class ImageInline(django.contrib.admin.TabularInline):
    model = apps.news.models.Image
    field = apps.news.models.Image.image.field.name


@django.contrib.admin.register(apps.news.models.News)
class NewsAdmin(django.contrib.admin.ModelAdmin):
    list_display = (
        apps.news.models.News.title.field.name,
        apps.news.models.News.image_tmb,
    )
    inlines = (ImageInline,)
