

export const fetchLoginRegister=(data,type)=>{
    const urlRegister="http://127.0.0.1:8000/auth/register/";
    const urlLogin="http://127.0.0.1:8000/auth/login/";
    const url = type=="login" ? urlLogin : urlRegister;
    try {
    
    const accessData=fetch(url, {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: type=="login" ? JSON.stringify({
        "username": data.username,
        "password": data.password
     }) 
     
     : 
     JSON.stringify({
        "username": data.username,
        "password": data.password,
        "password2": data.password2,
        "email": data.email,
        "first_name": data.first_name,
        "last_name": data.last_name,
        "bio": data.bio,
        "image":data.image
     })
     ,
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 
// Converting to JSON
.then(response => response.json());

if(type=="login") return accessData;
 
// Displaying results to console

        
    } catch (error) {
        
        console.log(error.message)

    }

    
    

}

const getUserData=()=>{
    fetch("http://127.0.0.1:8000/auth/user/")
}


