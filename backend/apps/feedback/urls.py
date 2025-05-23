import django.urls

import apps.feedback.views

app_name = "feedback"

urlpatterns = [
    django.urls.path(
        "",
        apps.feedback.views.FeedbackListCreateAPIView.as_view(),
        name="feedback-list-create",
    ),
    django.urls.path(
        "status-logs/",
        apps.feedback.views.StatusLogCreateAPIView.as_view(),
        name="statuslog-create",
    ),
]
