import django.conf
import django.conf.urls.static
import django.contrib
import django.urls
import rest_framework_swagger.views

schema_view = rest_framework_swagger.views.get_swagger_view(
    title="CoverAI API",
    url="/a-different-path",
)

urlpatterns = [
    django.urls.path(
        "admin/",
        django.contrib.admin.site.urls,
    ),
    django.urls.path(
        "api/v1/users/",
        django.urls.include("apps.users.urls"),
    ),
    django.urls.path(
        "api/v1/news/",
        django.urls.include("apps.news.urls"),
    ),
    django.urls.path(
        r"^$",
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
