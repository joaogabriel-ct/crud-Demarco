from rest_framework import permissions


class IsSuperAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True  # Permitir solicitações GET para todos
        return request.user.is_authenticated and request.user.is_superuser
