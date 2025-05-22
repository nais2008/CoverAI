import django.urls
import rest_framework_simplejwt.views

import apps.users.views

app_name = "users"

urlpatterns = [
    django.urls.path(
        "signup/",
        apps.users.views.RegisterView.as_view(),
        name="signup",
    ),
    django.urls.path(
        "token/",
        apps.users.views.MyTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    django.urls.path(
        "token/refresh",
        rest_framework_simplejwt.views.TokenRefreshView.as_view(),
        name="token_refresh",
    ),
]
