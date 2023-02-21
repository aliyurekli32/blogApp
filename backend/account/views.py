from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import RegisterSerializer
from rest_framework import generics


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
