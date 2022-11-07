from rest_framework import permissions


class IsAuthorOrTrainer(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user == obj.user or request.user.is_trainer:
            return True


class IsTrainer(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_trainer or request.user.is_superuser:
            return True
