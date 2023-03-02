

export const fetchLoginRegister=async(data,type)=>{
    const urlRegister="http://127.0.0.1:8000/auth/register/";
    const urlLogin="http://127.0.0.1:8000/auth/login/";
    const urlUpdate=`http://127.0.0.1:8000/auth/update_profile/${data?.id}/`;
    const url = type=="login" ? urlLogin : type=="register" ? urlRegister : urlUpdate;
    try {
    
    const accessData=await fetch(url, {
     
    // Adding method type
    method: type!=="update" ? "POST" : "PUT",
    credentials: "include",
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
        "Content-type": "application/json; charset=UTF-8",
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
        credentials: "include",
        headers: {
            "Content-type": "application/json; charset=UTF-8",

        }
    }).then(response=>response.json());
    console.log(userData)

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
            credentials: "include",
            body: JSON.stringify({
                "old_password": data.old_password,
                "password": data.password,
                "password2": data.password2
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                // "Authorization": `Bearer ${data.access}`
            }

        }
        ).then(res=>res.json()).then(data=>console.log(data))
    } catch (error) {
        console.log(error.message)
    }
}

export const getCategory=async()=>{
    try {
     const data =await fetch("http://127.0.0.1:8000/api/categories/",{
        method: "GET",
        credentials: "include",
     }).then(res=>res.json()).then(data=>data)
     return data
    } catch (error) {
        console.log(error)
    }

    
}

export const createBlog=async(data)=>{
    const url="http://127.0.0.1:8000/api/blogs/"

    try {
      const dataBlog=  await fetch(url,{
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",

            }
        }).then(res=>res.json()).then(data=>console.log(data));
        return dataBlog
    } catch (error) {
        
    }

    
}
export const getBlog=async()=>{
  const data=  await fetch("http://127.0.0.1:8000/api/blogs/",{
    method: "GET",
    credentials: "include",
  }
  ).then(res=>res.json()).then(data=>data);
  return data
}

export const postView=async(data)=>{
    await fetch("http://127.0.0.1:8000/api/post_views/",{
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            "post_views": true,
            "user_id": data.user_id,
            "post_id": data.post_id

        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",

        }

    })
}

export const sendLikeOrDelete=async(data)=>{
    console.log(data)
    const urlLike="http://127.0.0.1:8000/api/likes/";
    const urlLikeDelete=`http://127.0.0.1:8000/api/likes/${data?.likes_id}/`
    const url = !data?.likes_id ? urlLike : urlLikeDelete ;
    if (!data?.likes_id){
        const datal=await fetch(urlLike,{
            method: "POST" ,
            credentials: "include",
            body: 
             JSON.stringify({
                "user_id": data.user_id,
                "post_id": data.post_id,
                "likes": true
            }) 
            ,
            headers:  {
                "Content-type": "application/json; charset=UTF-8",

            }
        }).then(res=>res.json()).then(dataL=>console.log(dataL))
    
        return datal
    }else{
        await fetch(urlLikeDelete,{
            method: "DELETE",
            credentials: "include",
            headers:  {
                "Content-type": "application/json; charset=UTF-8",

            }
        })
    }

    
}

export const sendComment=async(data)=>{

    await fetch("http://127.0.0.1:8000/api/comments/",{
        method: "POST",
        credentials: "include",
        body:JSON.stringify({
            "content": data.comment,
           " user_id": data.user_id,
            "post_id": data.post_id
        }),
        headers:{
            "Content-type": "application/json; charset=UTF-8",

        }
    })

}

export const formatDate =(dateString)=> {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedYear = year.toString().substr(-2);
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedDay}-${formattedMonth}-${formattedYear} ${formattedHours}:${formattedMinutes}`;
  } 

export const  getCookie=()=> {
    const cookieObj = {};
    // Split the cookie string into an array of individual cookies
    const cookies = document.cookie.split(';')
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookieObj[name.trim()] = decodeURIComponent(value);
      });
      
    console.log(cookies)
   console.log(decodeURIComponent(cookies)) ;
   console.log(cookieObj) ;

  }