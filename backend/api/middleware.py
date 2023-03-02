import http.cookies

class SameSiteMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if 'Set-Cookie' in response:
            cookie_header = response['Set-Cookie']
            cookies = http.cookies.SimpleCookie()
            cookies.load(cookie_header)

            for cookie in cookies.values():
                if 'samesite' not in cookie:
                    cookie['samesite'] = 'None'
            
            cookie_header = cookies.output(header='').strip()
            response['Set-Cookie'] = cookie_header

        return response