from rest_framework import serializers

from .models import Category, Blog, Comment, Likes, PostViews

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class CommentSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only =True)
    user = serializers.StringRelatedField()
    post_id = serializers.IntegerField()
    post= serializers.StringRelatedField()
    class Meta:
        model = Comment
        fields = (
            'id',
            'user',
            'user_id',
            'time_stamp',
            'content',
            'post',
            'post_id',
        )

class LikesSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    user_id = serializers.IntegerField(read_only =True)
    post_id = serializers.IntegerField()
    class Meta:
        model = Likes
        fields = (
            'id',
            'user_id',
            'user',
            'post_id',
            "likes"
        )
class PostViewsSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only =True)
    user = serializers.StringRelatedField()
    post_id = serializers.IntegerField()
    post= serializers.StringRelatedField()
    class Meta:
        model = PostViews
        fields = ('id','user',"user_id","post", "post_id","post_views")

class BlogSerializer(serializers.ModelSerializer):
    comment_count = serializers.SerializerMethodField()
    author = serializers.StringRelatedField()
    author_id = serializers.IntegerField(read_only = True)
    comments = CommentSerializer(many = True, read_only = True)
    category_name = serializers.SerializerMethodField()
    likes_n = LikesSerializer(many = True, read_only = True)
    likes = serializers.SerializerMethodField()
    post_views = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = (
            'id',
            'title',
            'content',
            'image',
            'category',
            'publish_date',
            'author',
            'author_id',
            'status',  # sadece admin yapabilecek  #? only admin can do
            'slug',
            'comments',
            'category_name',
            'likes',
            'post_views',
            'comment_count',
            'likes_n',
        )

    #! Toplam kaç yorum yapıldığını hesaplar:
    #! Calculates the total number of comments made:
    def get_comment_count(self, obj):
        return Comment.objects.filter(post=obj.id).count()
    
    #! Category_id'den name metodu ile ismini yazdırmamızı sağlar:
    #! It allows us to print the name from the category_id with the name method:
    def get_category_name(self, obj):
        return Category.objects.get(name=obj.category).name

    #! like sayısını hesaplar:
    #! Calculates the number of likes:
    def get_likes(self, obj):
        return Likes.objects.filter(likes=True, post_id=obj.id).count()

    #! Blogların görüntülenme sayısını hesaplar:
    #! Calculates the number of views of blogs:
    def get_post_views(self, obj):
            return PostViews.objects.filter(post_views = True , post_id=obj.id).count()
    
class UserBlogSerializer(serializers.ModelSerializer):
    comment_count = serializers.SerializerMethodField()
    author = serializers.StringRelatedField()
    author_id = serializers.IntegerField(read_only = True)
    comments = CommentSerializer(many = True, read_only = True)
    category_name = serializers.SerializerMethodField()
    likes_n = LikesSerializer(many = True, read_only = True)
    likes = serializers.SerializerMethodField()
    post_views = serializers.SerializerMethodField()
    class Meta:
        model = Blog
        fields = (
            'id',
            'title',
            'content',
            'image',
            'category',
            'publish_date',
            'author',
            'author_id',
            'comments',
            'category_name',
            'likes',
            'post_views', 
            'comment_count',
            'likes_n', 
        )

    #! Toplam kaç yorum yapıldığını hesaplar:
    #! Calculates the total number of comments made:
    def get_comment_count(self, obj):
        return Comment.objects.filter(post=obj.id).count()

    #! Category_id'den name metodu ile ismini yazdırmamızı sağlar:
    #! It allows us to print the name from the category_id with the name method:
    def get_category_name(self, obj):
        return Category.objects.get(name=obj.category).name

    #! like sayısını hesaplar:
    #! Calculates the number of likes:
    def get_likes(self, obj):
        return Likes.objects.filter(likes=True, post_id=obj.id).count()

    #! Blogların görüntülenme sayısını hesaplar:
    #! Calculates the number of views of blogs:
    def get_post_views(self, obj):
        return PostViews.objects.filter(post_views = True , post_id=obj.id).count()
