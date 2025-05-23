import rest_framework.serializers

import apps.feedback.models


class PersonalDataSerializer(rest_framework.serializers.ModelSerializer):
    class Meta:
        model = apps.feedback.models.PersonalData
        fields = ["id", "user", "name", "email"]


class FeedbackSerializer(rest_framework.serializers.ModelSerializer):
    personal_data = PersonalDataSerializer()

    class Meta:
        model = apps.feedback.models.Feedback
        fields = ["id", "status", "text", "created_on", "personal_data"]
        read_only_fields = ["created_on"]

    def create(self, validated_data):
        personal_data_data = validated_data.pop("personal_data", None)
        if personal_data_data:
            personal_data = apps.feedback.models.PersonalData.objects.create(
                **personal_data_data,
            )
        else:
            personal_data = None
        feedback = apps.feedback.models.Feedback.objects.create(
            personal_data=personal_data,
            **validated_data,
        )
        return feedback


class StatusLogSerializer(rest_framework.serializers.ModelSerializer):
    class Meta:
        model = apps.feedback.models.StatusLog
        fields = [
            "id",
            "user",
            "feedback",
            "timestamp",
            "from_status",
            "to",
        ]
        read_only_fields = ["timestamp"]
