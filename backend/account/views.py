from datetime import datetime
from django.contrib.auth import authenticate
from django.conf import settings
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken,BlacklistedToken,OutstandingToken
from rest_framework.response import Response
from rest_framework import status
from django.middleware import csrf
# Create your views here.
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import RegisterSerializer,ChangePasswordSerializer,UpdateUserSerializer,LoginSerializer
from rest_framework import generics
from datetime import timedelta
from rest_framework import exceptions as rest_exceptions, response, decorators as rest_decorators, permissions as rest_permissions




def get_user_tokens(user):
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    return {
        'access_token': access_token,
        'refresh_token': str(refresh),
    }

###?????LOGİN VİEW###????????

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def loginView(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    username = serializer.validated_data["username"]
    password = serializer.validated_data["password"]

    user = authenticate(username=username, password=password)

    if user is not None:
        tokens = get_user_tokens(user)
        res = response.Response({"message": f"User {username} logged in succesfully"})
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


        res["X-CSRFToken"] = csrf.get_token(request)
        return res
    raise rest_exceptions.AuthenticationFailed(
        "Email or Password is incorrect!")
    
####???????#############

###!!!!!!REFRESH##!!!!!!
class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken(
                'No valid token found in cookie \'refresh\'')


class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):

        if response.data.get("refresh"):
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=response.data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

        if 'access'  in response.data:
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=response.data["access"],
                expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )
            del response.data["access"]

            
        
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)









###!!!???????!REFRESH


            






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
            res =Response(status=status.HTTP_205_RESET_CONTENT)
           
            
            res.delete_cookie('access', path='/', domain=None,samesite="None")
            res.delete_cookie('refresh', path='/', domain=None,samesite="None")
            res.delete_cookie("X-CSRFToken")
            res.delete_cookie("csrftoken")
            res["X-CSRFToken"]=None
            
            return res
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        
class LogoutAllView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        res = Response(status=status.HTTP_205_RESET_CONTENT)
        res.delete_cookie('access', path='/', domain=None,samesite="None")
        res.delete_cookie('refresh', path='/', domain=None,samesite="None")
        res.delete_cookie("X-CSRFToken")
        res.delete_cookie("csrftoken")
        res["X-CSRFToken"]=None
            
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            t, _ = BlacklistedToken.objects.get_or_create(token=token)
        BlacklistedToken.objects.filter(token__expires_at__lt=datetime.now()).delete()
        OutstandingToken.objects.filter(expires_at__lt=datetime.now()).delete()
        return res
    

class ProfileUser(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer
    def get_queryset(self):                                            # added string
        return super().get_queryset().filter(pk=self.request.user.pk)   # added string



class ResetView(APIView):
    def post(self, request):
        if ('access' or 'refresh') not in request.data:
            res = Response(status=status.HTTP_205_RESET_CONTENT)
            res.delete_cookie('access', path='/', domain=None,samesite="None")
            res.delete_cookie('refresh', path='/', domain=None,samesite="None")
            res.delete_cookie("X-CSRFToken")
            res.delete_cookie("csrftoken")
            res["X-CSRFToken"]=None
            
        BlacklistedToken.objects.filter(token__expires_at__lt=datetime.now()).delete()
        OutstandingToken.objects.filter(expires_at__lt=datetime.now()).delete()
        return res