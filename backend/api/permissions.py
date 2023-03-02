from rest_framework import permissions

class IsStaffOrReadOnly(permissions.IsAdminUser):
    #! category işlemlerininde sadece get işlemini her kullanıcı yapabilir, put post delete işlemlerini sadece staff user yapabilir:
    #! # Any user can only get category operations, only staff user can put post delete operations:
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:  # SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS')
            return True
        return bool(request.user and request.user.is_staff)

class IsOwnerOrReadOnly(permissions.BasePermission):
    #! Bloglarda get işlemini her kullanıcı yapabilecek update ve delete işlemlerini yalnızca blog sahibi ve staff user yapabilecek:
    #! Only the blog owner and staff user can perform the update and delete operations on the blogs:
    def has_object_permission(self, request, view, obj):
        if (request.method in permissions.SAFE_METHODS): 
            return True
        return bool(obj.author == request.user or request.user.is_staff)
    
class IsOwnerOrReadOnlyComment(permissions.BasePermission):
    #! Her kullanıcı kendi yorumunu düzenleyebilecek herkesin yorumunu görüntüleyebilecek:
    #! Each user will be able to view anyone's comment who can edit their own comment:
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS: 
            return True
        return bool(obj.author == request.user)