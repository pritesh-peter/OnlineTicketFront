import { myAxios } from "./helper";

export const signUp=async (user)=> {
    console.log(user.name);
    if(user.name===""){(user.name=null)}
    return await myAxios.post('/auth/register', user).then((response)=>response.data);
}

export const loginUser = async (loginDetail)=> {
    return await myAxios.post('/auth/login',loginDetail).then((response)=>response.data)
}