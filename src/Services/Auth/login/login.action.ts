"use server"

import { LoginFormData,  LoginUserDataResponse } from "@/Interfaces/Auth/Login.interfaces";

export async function sendLoginDataAction (userData: LoginFormData){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,{
        method: "POST",
        headers:{
            "content-type" : "application/json"
        },
        body: JSON.stringify(userData)
    })
    const data : LoginUserDataResponse = await  response.json();
    return data
}