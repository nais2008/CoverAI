import rest_framework.permissions

__all__ = ["IsStaffUser"]


class IsStaffUser(rest_framework.permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_staff
        )
