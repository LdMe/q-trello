import { getToken } from "./local";

const BACKEND_URL = "http://192.168.1.130:3020/api";

const fetchData = async(route,method,data) =>{
    try {
        const fetchOptions = {
            method:method,
            headers:{
                'Content-Type':'application/json'
            }
        }
        const token = getToken();
        console.log("token",token)
        if(token){
            fetchOptions.headers['Authorization'] = `Bearer ${token}`;
        }
        if(data){
            fetchOptions.body = JSON.stringify(data);
        }
        const response = await fetch(`${BACKEND_URL}${route}`,fetchOptions);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
       console.error(error) 
       return {error:error.message}
    }
}

const register = async(data) =>{
    const response = await fetchData("/register","POST",data);
    return response;
}
const login = async(data) =>{
    const response = await fetchData("/login","POST",data);
    return response;
}

const getProjects = async() =>{
    const response = await fetchData("/projects","GET");
    return response;
}
const createProject = async(data) =>{
    const response = await fetchData("/projects","POST",data);
    return response;
}
const getProjectById = async(id) =>{
    const response = await fetchData(`/projects/${id}`,"GET");
    return response;
}
export {
    fetchData,
    register,
    login,
    getProjects,
    createProject,
    getProjectById
}