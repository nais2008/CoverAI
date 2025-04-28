import django.contrib.auth.models
import django.db.models

import apps.users.email_normalizer

__all__ = ()

normalizer = apps.users.email_normalizer.EmailNormalizer()


class UserManager(django.contrib.auth.models.UserManager):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._profile = None
        self._user_profile_related = None

    @classmethod
    def normalize_email(cls, email):
        email = super().normalize_email(
            email,
        )
        return normalizer.normalize(email)

    def active(self):
        return self.get_queryset().filter(is_active=True)

    def by_mail(self, email):
        return self.active().get(email=self.normalize_email(email))

    def by_username(self, username):
        return self.active().get(username__iexact=username)

    def by_email_or_username(self, identifier):
        return self.active().get(
            django.db.models.Q(email=self.normalize_email(identifier))
            | django.db.models.Q(username__iexact=identifier),
        )
