import django.urls

import apps.news.views

app_name = "news"

urlpatterns = [
    django.urls.path(
        "",
        apps.news.views.NewsListView.as_view(),
        name="news-list",
    ),
    django.urls.path(
        "<int:pk>/",
        apps.news.views.NewsDetailView.as_view(),
        name="news-detale",
    ),
]

