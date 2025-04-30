import django.contrib.admin

import apps.users.models

django.contrib.admin.site.register(apps.users.models.User)
