import django.core.exceptions
from django.utils.translation import gettext_lazy as _

__all__ = ["validate_first_message_video"]

video_extensions = ("mp4", "mov", "avi", "mkv")


def validate_first_message_video(message):
    if not message.video:
        return

    extension = message.video.name.split(".")[-1].lower()
    is_video = extension in video_extensions

    if is_video:
        other_messages_exist = message.chat.messages.exclude(
            pk=message.pk,
        ).exists()

        if other_messages_exist:
            raise django.core.exceptions.ValidationError(
                _(
                    "Video can only be attached to "
                    "the very first message in a chat",
                ),
            )
