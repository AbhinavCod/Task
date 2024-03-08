import { UpdateFormData } from "./pages/ForgotPassword";
import {LoginFormData} from "./pages/Login";
import { SignUpData } from "./pages/SignUp";

export const login = async (formData:LoginFormData)=>{
    const response = await fetch("/api/auth/login",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData)
    })

    if(!response.ok){
        throw new Error("Something went wrong");
    }


    return response.json();
};

export const signup = async(formData:SignUpData)=>{
    const response = await fetch("/api/auth/register",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
    });


    if(!response.ok){
        throw new Error("Something went wrong");
    }


    return response.json();
};

export const forgotPassword = async (formData:UpdateFormData)=>{
    const response = await fetch("/api/auth/forgot-password",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
    });


    if(!response.ok){
        throw new Error("Something went wrong");
    }


    return response.json();
}