

export const fetchLoginRegister=async(data,type)=>{
    const urlRegister="http://127.0.0.1:8000/auth/register/";
    const urlLogin="http://127.0.0.1:8000/auth/login/";
    const urlUpdate=`http://127.0.0.1:8000/auth/update_profile/${data?.id}/`;
    const url = type=="login" ? urlLogin : type=="register" ? urlRegister : urlUpdate;
    try {
    
    const accessData=await fetch(url, {
     
    // Adding method type
    method: type!=="update" ? "POST" : "PUT",
     
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
   
    
    headers: type !=="update" ? {
        "Content-type": "application/json; charset=UTF-8"
    } 
    : 
    {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${data.access}`
    }
    
})
 
// Converting to JSON
.then(response => response.json());

if(type=="login" || type=="update" ) return accessData;
 
// Displaying results to console

        
    } catch (error) {
        
        console.log(error.message)

    }

    
    

}

export const fetchUser=async(a)=>{
    try {
      const userData= await fetch("http://127.0.0.1:8000/auth/user/",{
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${a.access}`
        }
    }).then(response=>response.json());

    return userData;
    } catch (error) {
        console.log(error.message)
    }

    
}

export const passUpdate=async(data)=>{
    try {
        await fetch(`http://127.0.0.1:8000/auth/change_password/${data?.id}/`,
        {
            method: "PUT",
            body: JSON.stringify({
                "old_password": data.old_password,
                "password": data.password,
                "password2": data.password2
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${data.access}`
            }

        }
        ).then(res=>res.json()).then(data=>console.log(data))
    } catch (error) {
        console.log(error.message)
    }
}


