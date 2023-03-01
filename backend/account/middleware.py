import json
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
class JWTHttpOnlyCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        url = request.build_absolute_uri(request.path)
        access=request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        refresh=request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        if url=="http://127.0.0.1:8000/auth/login/" or url=="http://127.0.0.1:8000/auth/register/":
            response = self.get_response(request)
            return response
        elif url=="http://127.0.0.1:8000/auth/login/refresh/":
            if refresh is not None:
                try:
                    new=json.loads(request.body.decode('UTF-8'))
                    new['refresh']=refresh
                    newstr=json.dumps(new).encode()
                    request._body=newstr          
                    # response = self.get_response(request)
                    # return response
                except json.decoder.JSONDecodeError:
                    response = self.get_response(request)
                    return response
        elif url=="http://127.0.0.1:8000/auth/logout/" or url=="http://127.0.0.1:8000/auth/logout_all/":
            try:
                request.META['HTTP_AUTHORIZATION']=f'Bearer {access}'
                new=json.loads(request.body.decode('UTF-8'))
                new['refresh']=refresh
                newstr=json.dumps(new).encode()
                request._body=newstr            
                # response = self.get_response(request)
                # return response
            except json.decoder.JSONDecodeError:
                response = self.get_response(request)
                return response
        elif access is None :
            response = self.get_response(request)
            return response
        else:
            if  url!="http://127.0.0.1:8000/auth/login/refresh/":
                if access is not None:
                    request.META['HTTP_AUTHORIZATION']=f'Bearer {access}'
        

        response = self.get_response(request)
        return response
        
    
        # url = request.build_absolute_uri(request.path)
        # if not response.data:
        #             response.data = {}
        # response.data.url=url
        # print(response.data.url)
        