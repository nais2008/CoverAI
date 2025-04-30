import django.contrib.admin

import apps.news.models

django.contrib.admin.site.register(apps.news.models.News)
