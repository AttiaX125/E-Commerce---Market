"use server"

import { getUserToken } from "../myUtil"
import { UpdateUserType } from "./setting.interfance"

export async function UpdateLoggedData (data : UpdateUserType){
    const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/updateMe/`,{
        method : "PUT",
        headers: {
            token : (await getUserToken() as string),
            "content-type" : "application/json"
        } ,
        body : JSON.stringify(data)  
    })
    const responseData = await response.json();
    console.log("updated", responseData)
    return responseData;
}

export async function addUserAddress  (){
    
}