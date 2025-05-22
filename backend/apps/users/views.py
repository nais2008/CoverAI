import rest_framework.authtoken.models
import rest_framework.response
import rest_framework.status
import rest_framework.views
import rest_framework_simplejwt.views

import apps.users.serializers

__all__ = ["RegisterView", "MyTokenObtainPairView"]


class RegisterView(rest_framework.views.APIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = apps.users.serializers.RegisterSerializer(
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        token, _ = (
            rest_framework
            .authtoken
            .models
            .Token
            .objects
            .get_or_create(
                user=user,
            )
        )

        return rest_framework.response.Response(
            {
                "id": user.pk,
                "username": user.username,
                "email": user.email,
                "token": token.key,
            },
            status=rest_framework.status.HTTP_201_CREATED,
        )


class MyTokenObtainPairView(
    rest_framework_simplejwt.views.TokenObtainPairView,
):
    serializer_class = apps.users.serializers.MyTokenObtainPairSerializer
