from datetime import datetime
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken,BlacklistedToken,OutstandingToken
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import RegisterSerializer,ChangePasswordSerializer,UpdateUserSerializer
from rest_framework import generics


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
                                           


class ChangePasswordView(generics.UpdateAPIView):

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer
    
class UpdateProfileView(generics.UpdateAPIView):

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer
    def get_queryset(self):                                            # added string
        return super().get_queryset().filter(pk=self.request.user.pk)   # added string
    



class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        
class LogoutAllView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            t, _ = BlacklistedToken.objects.get_or_create(token=token)
        BlacklistedToken.objects.filter(token__expires_at__lt=datetime.now()).delete()
        OutstandingToken.objects.filter(expires_at__lt=datetime.now()).delete()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    

class ProfileUser(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer
    def get_queryset(self):                                            # added string
        return super().get_queryset().filter(pk=self.request.user.pk)   # added string
