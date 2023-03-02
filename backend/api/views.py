from django.shortcuts import render

from .models import Category, Blog, Comment, Likes, PostViews
from .serializers import CategorySerializer, BlogSerializer, CommentSerializer, LikesSerializer, PostViewsSerializer, UserBlogSerializer
from .permissions import IsStaffOrReadOnly, IsOwnerOrReadOnly, IsOwnerOrReadOnlyComment

from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

# Create your views here.

class CategoryView(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    #! category işlemlerininde sadece get işlemini her kullanıcı yapabilir, put post delete işlemlerini sadece staff user yapabilir:
    #! # Any user can only get category operations, only staff user can put post delete operations:
    permission_classes = [IsStaffOrReadOnly]  

class BlogView(ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = UserBlogSerializer
    #! Bloglarda get işlemini her kullanıcı yapabilecek update ve delete işlemlerini yalnızca blog sahibi ve staff user yapabilecek:
    #! Only the blog owner and staff user can perform the update and delete operations on the blogs:
    permission_classes = [IsOwnerOrReadOnly]  
    
    def perform_create(self, serializer):
       serializer.save(author=serializer.context['request'].user)
    
    #! Blog sayfasının detayına girdiğimizde post_view create edilecek:
    #! When we enter the details of the blog page, the post_view will be created:
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        view_query = PostViews.objects.filter(user = request.user, post = instance)
        if not view_query.exists():  # daha önce detayı inceleyen kullanıcı yok ise create işlemi yapılacak #? If there is no user who has examined the detail before, the create operation will be done
            PostViews.objects.create(user = request.user, post = instance, post_views = True)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    #! Kullanıcı eğer blog sahibi ya da staff ise bloglarının status'u 'd' olsa bile görüntüleyip düzenleyebilecek:
    #! If the user is the owner or team of the blog, they can view and edit it, even if the blog status is 'd':
    def get_queryset(self):
        if self.request.user.is_staff:
           return super().get_queryset()
        if super().get_queryset().filter(author = self.request.user.id) :
            return super().get_queryset()
        else:
            return super().get_queryset().filter(status='p')  # sadece yayın statusu public olan blogları yayınla #? only publish blogs with public post status

    #! Kullanı staff ise BlogSerializer kullansın değil ise UserBlogSerializer'ı kullansın:
    #! If the user is staff, let him use the Blog Serializer; otherwise, let him use the UserBlogSerializer:
    def get_serializer_class(self):
        serializer = super().get_serializer_class()
        if self.request.user.is_staff:
            return BlogSerializer
        return serializer


class CommentView(ModelViewSet):
    
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    #! Her kullanıcı kendi yorumunu düzenleyebilecek herkesin yorumunu görüntüleyebilecek:
    #! Each user will be able to view anyone's comment who can edit their own comment:
    permission_classes = [IsOwnerOrReadOnlyComment]  
    def perform_create(self, serializer):
       serializer.save(user=serializer.context['request'].user)


class LikesView(ModelViewSet):
    queryset = Likes.objects.filter(likes = True)
    serializer_class = LikesSerializer
    
    def perform_create(self, serializer):
       serializer.save(user=serializer.context['request'].user)
       
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        data = {
            "message":"Likes successfully deleted"
        }
        return Response(data,status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()
       
class PostViewSet(ModelViewSet):
    queryset = PostViews.objects.all()
    serializer_class = PostViewsSerializer
    
    def perform_create(self, serializer):
       serializer.save(user=serializer.context['request'].user)