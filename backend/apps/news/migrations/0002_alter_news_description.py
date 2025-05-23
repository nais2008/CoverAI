# Generated by Django 4.2.10 on 2025-05-22 04:52

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ("news", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="news",
            name="description",
            field=tinymce.models.HTMLField(
                help_text="Write description news",
                max_length=500,
                verbose_name="Description news",
            ),
        ),
    ]
