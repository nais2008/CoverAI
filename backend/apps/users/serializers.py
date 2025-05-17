import django.contrib.auth
import rest_framework
import rest_framework.serializers

__all__ = []

User = django.contrib.auth.get_user_model()


class UserSerializer(rest_framework.serializers.ModelSerializer):
    class Meta:
        model = User
        field = [
            User.pk.field.name,
            User.username.field.name,
        ]
