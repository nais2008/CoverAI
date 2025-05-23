import django.contrib.auth
import django.core.files.storage
import rest_framework
import rest_framework.serializers
import rest_framework_simplejwt.serializers

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


class MyTokenObtainPairSerializer(
    rest_framework_simplejwt.serializers.TokenObtainPairSerializer,
):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["email"] = user.email
        token["is_staff"] = user.is_staff
        token["first_name"] = user.first_name or ""
        token["last_name"] = user.last_name or ""
        if user.image and django.core.files.storage.default_storage.exists(
            user.image.name,
        ):
            token["image"] = user.image.url
        else:
            token["image"] = ""

        return token


class UserUpdateSerializer(rest_framework.serializers.ModelSerializer):
    first_name = rest_framework.serializers.CharField(
        required=False, allow_blank=True
    )
    last_name = rest_framework.serializers.CharField(
        required=False, allow_blank=True
    )
    email = rest_framework.serializers.EmailField(required=False)
    password = rest_framework.serializers.CharField(
        required=False, write_only=True, style={"input_type": "password"}
    )
    password_confirm = rest_framework.serializers.CharField(
        required=False, write_only=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
            "password_confirm",
        ]

    def validate(self, attrs):
        password = attrs.get("password", None)
        password_confirm = attrs.get("password_confirm", None)

        if password and password != password_confirm:
            raise rest_framework.serializers.ValidationError(
                "Passwords do not match."
            )

        return attrs

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get(
            "first_name", instance.first_name
        )
        instance.last_name = validated_data.get(
            "last_name", instance.last_name
        )
        instance.email = validated_data.get("email", instance.email)

        password = validated_data.get("password", None)
        if password:
            instance.set_password(password)

        instance.save()
        return instance
