import django.contrib.auth
import rest_framework
import rest_framework.serializers

__all__ = ["RegisterSerializer"]

User = django.contrib.auth.get_user_model()


class RegisterSerializer(rest_framework.serializers.ModelSerializer):
    password = rest_framework.serializers.CharField(
        write_only=True,
        min_length=8,
    )
    password2 = rest_framework.serializers.CharField(
        write_only=True,
        min_length=8,
    )
    first_name = rest_framework.serializers.CharField(
        required=False,
        allow_blank=True,
    )
    last_name = rest_framework.serializers.CharField(
        required=False,
        allow_blank=True,
    )

    class Meta:
        model = User
        fields = [
            User._meta.pk.name,
            User.username.field.name,
            User.first_name.field.name,
            User.last_name.field.name,
            User.email.field.name,
            "password",
            "password2",
        ]

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise rest_framework.serializers.ValidationError(
                "Passwords do not match.",
            )

        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        return User.objects.create_user(**validated_data)
