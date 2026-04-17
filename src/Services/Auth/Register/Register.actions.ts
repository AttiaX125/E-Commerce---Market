"use server"

import { RegisterResponse, userDataType } from "@/Interfaces/Auth/Register.interface";

export async function sendRegisterDataActions (userData : userDataType) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,{
        method: "POST",
        headers:{
            "content-type" : "application/json"
        },
        body : JSON.stringify(userData)
    })
    const data: RegisterResponse = await response.json();
    console.log(data)
    return data
}