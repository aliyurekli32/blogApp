import { useDispatch } from "react-redux";
import useAuth from "./useAuth";


const useApi=()=>{
  const {auth}=useAuth()
  const makeRequest = async(method, data,url,id) => {
    console.log(url)
    const urlApi= id ? `http://127.0.0.1:8000/${url}/${id}/` : `http://127.0.0.1:8000/${url}/`;
    const options = {
      method,
      credentials:"include",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      ...((method!=='GET' && method!=='DELETE')&&{body:JSON.stringify(data) || undefined})
    };
      try {
       const response=await fetch(urlApi, options)
       if(response.status=="401"){
        return auth("refresh")
       }
       const res=await response.json()
       return res
      } catch (error) {
          console.error(error)
      }
  }

  const getData = async(url,id) => {

   return  await makeRequest('GET',"",url,id)
  }

  const postData = async(data,url) => {
   return await makeRequest('POST', data,url)

  }

  const putData = async(data,url,id) => {
   return await makeRequest('PUT', data,url,id)

  }

  const patchData = async(data,url,id) => {
   return await makeRequest('PATCH', data,url,id)

  }

  const deleteData = async(url,id) => {
   return await makeRequest('DELETE',"",url,id)

  }
  // useEffect(()=>{},[dataF])

  return { getData, postData, putData, patchData, deleteData };
}
export default useApi;