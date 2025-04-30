import django.contrib.admin

import apps.chat.models

__all__ = ()


class MessageImageInline(django.contrib.admin.TabularInline):
    model = apps.chat.models.ImageMessage
    field = apps.chat.models.ImageMessage.image.field.name


text_field_message = apps.chat.models.Message.text.field.name


@django.contrib.admin.register(apps.chat.models.Message)
class MessageAdmin(django.contrib.admin.ModelAdmin):
    readonly_fields = (text_field_message,)
    inlines = (MessageImageInline,)
