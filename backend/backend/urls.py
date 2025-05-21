import django.conf
import django.conf.urls.static
import django.contrib
import django.urls
import rest_framework_swagger.views

schema_view = rest_framework_swagger.views.get_swagger_view(
    title="*",
)

urlpatterns = [
    django.urls.path(
        "admin/",
        django.contrib.admin.site.urls,
    ),
    django.urls.path(
        "api-auth/",
        django.urls.include("rest_framework.urls"),
    ),
    django.urls.path(
        "api/",
        django.urls.include("apps.api.urls"),
    ),
    django.urls.path(
        "docs/",
        schema_view,
    ),
]

if django.conf.settings.DEBUG:
    urlpatterns += (
        django.urls.path(
            "__debug__/",
            django.urls.include("debug_toolbar.urls"),
        ),
    )

urlpatterns += django.conf.urls.static.static(
    django.conf.settings.STATIC_URL,
    document_root=django.conf.settings.STATIC_ROOT,
)
urlpatterns += django.conf.urls.static.static(
    django.conf.settings.MEDIA_URL,
    document_root=django.conf.settings.MEDIA_ROOT,
)
