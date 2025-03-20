import django.db
import django.db.models
from django.utils.translation import gettext_lazy as _

__all__ = ["PersonalData"]


class PersonalData(django.db.models.Model):
    user = django.db.models.ForeignKey()
    name = django.db.models.TextField(
        _("name"),
        max_length=150,
        help_text=_("Feedback author"),
        blank=True,
        null=True,
    )
    mail = django.db.models.EmailField(
        _("mail"),
        help_text=_("Feedback author`s mail"),
        max_length=200,
    )

    def __str__(self):
        return self.mail[:15]


class Feedback(django.db.models.Model):
    
