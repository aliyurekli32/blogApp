import { useState } from 'react';




const API_URL = 'http://127.0.0.1:8000/auth';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authRequest = async (endpoint, method, body) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${endpoint}/`, {
        method: method,
        credentials:"include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",

        },
        body: body ? JSON.stringify(body) : undefined
      });
      if(response.status==401){
        return auth('reset')
      }else if(endpoint=="reset"){
        window.history.pushState({}, '', '/');
      }

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        setIsLoading(false);
        return 
      }
      
      const responseData = await response.json();


      setIsLoading(false);
      return responseData;
    } catch (error) {
      setError(error.message);
    }
  };

  const auth = async (operation, data,id) => {
    switch (operation) {
      case 'login':
        return await authRequest('login', 'POST', data);
      case 'refresh':
        return await authRequest('login/refresh', 'POST');
      case 'reset':
        await authRequest('reset', 'POST');
        return;
      case 'logout':
        await authRequest('logout', 'POST');
        return;
      case 'logout_all':
        await authRequest('logout_all', 'POST');
        return;  
      case 'register':
        return await authRequest('register', 'POST', data);
      case 'change_password':
        return await authRequest(`change_password/${id}`, 'PUT', data);
      case 'resetPassword':
        return await authRequest('reset-password', 'POST', data);
      case 'confirmPasswordReset':
        return await authRequest('confirm-password-reset', 'POST', data);
      default:
        throw new Error(`Invalid operation: ${operation}`);
    }
  };

  return { error, auth };
};

export default useAuth;