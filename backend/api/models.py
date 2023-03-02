from django.db import models

from account.models import User

from django.utils.text import slugify

class Category(models.Model):

    name = models.CharField(max_length = 25)

    def __str__(self):
        return self.name
    

class Blog(models.Model):
    STATUS = (
        ('d', 'Draft'),
        ('p', 'Published'),
    )
    title = models.CharField(max_length = 100, unique=True)
    content = models.TextField()
    image = models.TextField(blank = True, null = True)
    category = models.ForeignKey(Category, on_delete = models.CASCADE, related_name = 'blog')
    publish_date = models.DateTimeField(auto_now_add = True)  # readOnly: true
    author = models.ForeignKey(User, on_delete = models.CASCADE)  # readOnly: true
    status = models.CharField(max_length = 5, choices = STATUS, default='d', blank=True, null=True)
    slug = models.SlugField(max_length=100, unique=True, editable=False)
    # comments readOnly: true
    # category_name readOnly: true
    # likes readOnly: true
    # post_views readOnly: true
    # comment_count readOnly: true
    # likes_n readOnly: true

    def __str__(self):
        return self.title

    #! Title a uygun bir slug oluşturmamızı sağlar:
    #! It allows us to create a slug suitable for the title:
    def save(self, *args, **kwargs):
        if not self.slug:
            slug_sample = slugify(self.title)
            self.slug = slug_sample
        super().save()

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_post_comments')
    time_stamp = models.DateTimeField(auto_now_add=True)
    content = models.CharField(max_length = 150)
    post = models.ForeignKey(Blog, on_delete=models.CASCADE,related_name='comments')

    def __str__(self):
        return self.content

class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'user_likes')
    post = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name = 'likes_n')
    likes= models.BooleanField(default = False)


class PostViews(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'user_post_views')
    post_views = models.BooleanField(default = False)
    post = models.ForeignKey(Blog, on_delete=models.CASCADE,related_name='post_views')
    time_stamp = models.DateTimeField(auto_now_add=True)