from datetime import datetime
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken,BlacklistedToken,OutstandingToken
from rest_framework.response import Response
from rest_framework import status
from django.middleware import csrf
# Create your views here.
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import RegisterSerializer,ChangePasswordSerializer,UpdateUserSerializer
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import timedelta
from django.conf import settings




def get_user_tokens(user):
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    return {
        'access_token': access_token,
        'refresh_token': str(refresh),
    }



class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            tokens = get_user_tokens(request.user)
            res = response.Response()
            res.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=tokens["access_token"],
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            res.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=tokens["refresh_token"],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            res.data = {
                "message": "refresh and access tokens created "
            }

            return res 

            






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
