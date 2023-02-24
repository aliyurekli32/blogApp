from django.shortcuts import render
from .models import Category, Blog, Comment, Likes, PostViews
from .serializers import CategorySerializer, BlogSerializer, CommentSerializer, LikesSerializer, PostViewsSerializer
from rest_framework.viewsets import ModelViewSet
from .permissions import IsStaffOrReadOnly, IsOwnerOrReadOnly, IsOwnerOrReadOnlyComment
from rest_framework.response import Response



# Create your views here.

class CategoryView(ModelViewSet):
    
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsStaffOrReadOnly]  # category işlemleriniden sadece get işlemini her login olan kullanıcı görebilir ama put post delete işlemlerini sadece staff user yapabilir.
     

class BlogView(ModelViewSet):
    
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsOwnerOrReadOnly]  # Bloglarda get işlemini login olan her kullanıcı yapabilecek update ve delete işlemlerini yalnızca blog sahibi yapabilecek
    
    def perform_create(self, serializer):
       serializer.save(author=serializer.context['request'].user)
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # def perform_create(self, serializer):
    #     serializer.save()

    def get_queryset(self):
        if self.request.user.is_staff:
           return super().get_queryset()
        else:
            return super().get_queryset().filter(status='p')  # sadece yayın statusu public olan blogları yayınla

    #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    # # TEK KULLAN
    
    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     if PostViews.objects.get(user_id=request.user.id) and  PostViews.objects.get(post_id = instance.id):
    #         PostViews.objects.get(post_views = True)
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)


class CommentView(ModelViewSet):
    
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnlyComment]  # her kullanıcı kendi yorumunu düzenleyebilecek herkesin yorumunu görüntüleyebilecek

class LikesView(ModelViewSet):

    queryset = Likes.objects.all()
    serializer_class = LikesSerializer

    def get_queryset(self):
        if Likes.objects.filter(likes = False):
           obj = Likes.objects.filter(likes = False).delete()
           obj.save()
        return obj
    
class PostViewSet(ModelViewSet):
    queryset = PostViews.objects.all()
    serializer_class = PostViewsSerializer
