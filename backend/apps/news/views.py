import django.shortcuts
import rest_framework.status
import rest_framework.permissions
import rest_framework.response
import rest_framework.views

import apps.news.models
import apps.news.permissions
import apps.news.serializers

__all__ = ["IsStaffUser", "NewsListView", "NewsDetailView"]



class NewsListView(rest_framework.views.APIView):
    def get_permissions(self):
        if self.request.method == "POST":
            return [apps.news.permissions.IsStaffUser()]

        return [rest_framework.permissions.AllowAny()]

    def get(self, request):
        queryset = apps.news.models.News.objects.by_create_at()
        serializer = apps.news.serializers.NewsSerializer(
            queryset,
            many=True,
        )

        return rest_framework.response.Response(
            serializer.data,
        )

    def post(self, request):
        serializer = apps.news.serializers.NewsSerializer(
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return rest_framework.response.Response(
            serializer.data,
            status=rest_framework.status.HTTP_201_CREATED,
        )


class NewsDetailView(rest_framework.views.APIView):
    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            return [apps.news.permissions.IsStaffUser()]

        return [rest_framework.permissions.AllowAny()]

    def get_object(self, pk):
        return django.shortcuts.get_object_or_404(
            apps.news.models.News,
            pk=pk,
        )

    def get(self, request, pk):
        news = self.get_object(pk)
        serializer = apps.news.serializers.NewsSerializer(
            news,
        )

        return rest_framework.response.Response(
            serializer.data,
        )

    def put(self, request, pk):
        news = self.get_object(pk)
        serializer = apps.news.serializers.NewsSerializer(
            news,
            data=request.data,
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return rest_framework.response.Response(
            serializer.data,
        )

    def patch(self, request, pk):
        news = self.get_object(pk)
        serializer = apps.news.serializers.NewsSerializer(
            news,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return rest_framework.response.Response(
            serializer.data,
        )

    def delete(self, request, pk):
        news = self.get_object(pk)
        news.delete()

        return rest_framework.response.Response(
            resstatus=rest_framework.status.HTTP_204_NO_CONTENT,
        )

