import rest_framework.decorators
import rest_framework.response

__all__ = []


@rest_framework.decorators.api_view(["POST"])
def login(request):
    return rest_framework.response.Response({})


@rest_framework.decorators.api_view(["POST"])
def signup(request):
    return rest_framework.response.Response({})
