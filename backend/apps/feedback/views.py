import django.shortcuts
import rest_framework.views
import rest_framework.response
import rest_framework.status
import rest_framework.permissions
import rest_framework.exceptions

import apps.feedback.models
import apps.feedback.serializers


class FeedbackListCreateAPIView(rest_framework.views.APIView):
    permission_classes = [rest_framework.permissions.AllowAny]

    def get(self, request):
        feedbacks = apps.feedback.models.Feedback.objects.select_related(
            "personal_data",
        ).all()
        serializer = apps.feedback.serializers.FeedbackSerializer(
            feedbacks,
            many=True,
        )

        return rest_framework.response.Response(serializer.data)

    def post(self, request):
        serializer = apps.feedback.serializers.FeedbackSerializer(
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)
        feedback = serializer.save()

        return rest_framework.response.Response(
            apps.feedback.serializers.FeedbackSerializer(feedback).data,
            status=rest_framework.status.HTTP_201_CREATED,
        )


class StatusLogCreateAPIView(rest_framework.views.APIView):
    permission_classes = [rest_framework.permissions.IsAuthenticated]

    def post(self, request):
        serializer = apps.feedback.serializers.StatusLogSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)

        valid_statuses = [
            choice[0]
            for choice in apps.feedback.models.Feedback.StatusChoices.choices
        ]

        from_status = serializer.validated_data.get("from_status")
        to_status = serializer.validated_data.get("to")

        if from_status not in valid_statuses:
            raise rest_framework.exceptions.ValidationError(
                {"from_status": "Недопустимый статус"}
            )
        if to_status not in valid_statuses:
            raise rest_framework.exceptions.ValidationError(
                {"to": "Недопустимый статус"}
            )

        feedback = serializer.validated_data.get("feedback")
        if not feedback:
            raise rest_framework.exceptions.ValidationError(
                {"feedback": "Обратная связь не найдена"}
            )

        serializer.save(user=request.user)
        return rest_framework.response.Response(
            serializer.data, status=rest_framework.status.HTTP_201_CREATED
        )
