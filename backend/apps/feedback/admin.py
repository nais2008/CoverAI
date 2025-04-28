import django.contrib.admin
import django.contrib.admin.utils
import django.utils.html
from django.utils.translation import gettext_lazy as _

import apps.feedback.models

__all__ = ()


@django.contrib.admin.register(apps.feedback.models.Feedback)
class FeedbackAdmin(django.contrib.admin.ModelAdmin):
    list_display = (
        "personal_data_name",
        "personal_data_user",
        apps.feedback.models.Feedback.status.field.name,
        apps.feedback.models.Feedback.created_on.field.name,
    )
    fields = (
        "personal_data_user",
        "personal_data_mail",
        "personal_data_name",
        apps.feedback.models.Feedback.text.field.name,
        apps.feedback.models.Feedback.created_on.field.name,
        apps.feedback.models.Feedback.status.field.name,
    )
    list_display_links = (
        apps.feedback.models.Feedback.created_on.field.name,
        apps.feedback.models.Feedback.status.field.name,
    )
    readonly_fields = (
        apps.feedback.models.Feedback.created_on.field.name,
        apps.feedback.models.Feedback.text.field.name,
        "personal_data_name",
        "personal_data_mail",
        "personal_data_user",
    )

    def personal_data_name(self, obj):
        if obj.personal_data.name:
            return obj.personal_data.name

        return _("Anonymous")

    personal_data_name.short_description = _("Author Name")

    def personal_data_mail(self, obj):
        return obj.personal_data.mail

    personal_data_mail.short_description = _("Author Email")

    def personal_data_user(self, obj):
        if obj.personal_data.user:
            return django.utils.html.format_html(
                '<a href="{}">{}</a>',
                django.contrib.admin.utils.reverse(
                    "admin:users_user_change",
                    args=[obj.personal_data.user.pk],
                ),
                obj.personal_data.user,
            )

        return _("Not logged in")

    personal_data_user.short_description = _("Author User")

    def save_model(self, request, obj, form, change):
        if change:
            previous = apps.feedback.models.Feedback.objects.get(pk=obj.pk)
            if previous.status != obj.status:
                if request.user.is_authenticated:
                    apps.feedback.models.StatusLog.objects.create(
                        user=request.user,
                        feedback=obj,
                        from_status=previous.status,
                        to=obj.status,
                    )
                else:
                    raise Exception(_("User not authenticated."))

        super().save_model(request, obj, form, change)

    def has_add_permission(self, request):
        return False


@django.contrib.admin.register(apps.feedback.models.StatusLog)
class StatusLogAdmin(django.contrib.admin.ModelAdmin):
    list_display = (
        apps.feedback.models.StatusLog.user.field.name,
        "feedback_link",
        apps.feedback.models.StatusLog.timestamp.field.name,
        apps.feedback.models.StatusLog.from_status.field.name,
        apps.feedback.models.StatusLog.to.field.name,
    )
    readonly_fields = (
        apps.feedback.models.StatusLog.user.field.name,
        apps.feedback.models.StatusLog.timestamp.field.name,
        apps.feedback.models.StatusLog.from_status.field.name,
        apps.feedback.models.StatusLog.to.field.name,
    )

    def feedback_link(self, obj):
        return django.utils.html.format_html(
            '<a href="{}">{}</a>',
            django.contrib.admin.utils.reverse(
                "admin:feedback_feedback_change",
                args=[obj.feedback.pk],
            ),
            obj.feedback,
        )

    feedback_link.short_description = _("Feedback Author")

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False
