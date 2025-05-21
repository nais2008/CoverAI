import django.contrib.auth.backends

import apps.users.models

__all__ = ["EmailBackend"]


class EmailBackend(django.contrib.auth.backends.ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None or password is None:
            return None

        try:
            user = apps.users.models.User.objects.by_email_or_username(
                username,
            )
        except apps.users.models.User.DoesNotExist:
            return None

        if not user.check_password(password):
            return None

        if not self.user_can_authenticate(user):
            return None

        return user
