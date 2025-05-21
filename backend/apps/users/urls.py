import django.urls

import apps.users.views

app_name = "users"

urlpatterns = [
    django.urls.path(
        "signup/",
        apps.users.views.RegisterView.as_view(),
        name="signup",
    ),
]
