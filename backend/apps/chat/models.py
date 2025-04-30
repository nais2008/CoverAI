import django.conf
import django.db.models
from django.utils.translation import gettext_lazy as _

import apps.chat.validators
import apps.core.models

__all__ = ["Chat", "Message"]


class Chat(apps.core.models.BaseCreateModel):
    user = django.db.models.ForeignKey(
        django.conf.settings.AUTH_USER_MODEL,
        on_delete=django.db.models.CASCADE,
        null=True,
        blank=True,
        related_name="chats",
        help_text=_("user chat/none"),
    )

    title = django.db.models.TextField(
        _("title"),
        blank=True,
        max_length=200,
        help_text=_("title chat"),
    )
    created_at = django.db.models.DateTimeField(
        _("created at"),
        auto_now_add=True,
        help_text=_("Date and time created chat"),
    )

    def __str__(self):
        return self.title or _(f"Chat {self.id}")


class Message(apps.core.models.BaseCreateModel):
    chat = django.db.models.ForeignKey(
        Chat,
        on_delete=django.db.models.CASCADE,
        related_name="messages",
        help_text=_("messege in chat"),
    )

    text = django.db.models.TextField(
        _("text"),
        blank=True,
        help_text=_("user message/none"),
    )
    video = django.db.models.FileField(
        upload_to="chat/videos",
        blank=True,
        null=True,
        help_text=_("video in the first message form AI"),
    )
    created_at = django.db.models.DateTimeField(
        _("created at"),
        auto_now_add=True,
        help_text=_("Date and time created message"),
    )
    is_ai = django.db.models.BooleanField(
        _("is ai"),
        default=False,
        help_text=_("msg from ai/user"),
    )

    def __str__(self):
        return f"Сообщение {self.id} в чате {self.chat_id}"

    def clean(self):
        apps.chat.validators.validate_first_message_video(self)


class ImageMessage(apps.core.models.BaseImageModel):
    message = django.db.models.ForeignKey(
        Message,
        on_delete=django.db.models.CASCADE,
        related_name="images",
        help_text=_("img in msg"),
    )

    def __str__(self):
        return _(f"img {self.id} msg {self.message_id}")
