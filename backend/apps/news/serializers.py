import rest_framework.serializers

import apps.news.models

__all__ = ["NewsSerializer"]


class ImageSerializer(rest_framework.serializers.ModelSerializer):
    class Meta:
        modal = apps.news.models.Image
        fields = [
            apps.news.models.Image.image.field.name,
        ]
        read_only_fields = fields


class NewsSerializer(rest_framework.serializers.ModelSerializer):
    image = ImageSerializer(read_only=True)

    class Meta:
        model = apps.news.models.News
        fields = [
            "pk",
            apps.news.models.News.title.field.name,
            apps.news.models.News.description.field.name,
            "image",
            apps.news.models.News.created_at.field.name,
        ]
        read_only_fields = [
            "pk",
            apps.news.models.News.created_at.field.name,
        ]
