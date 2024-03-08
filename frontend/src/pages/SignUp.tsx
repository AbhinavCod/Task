import { useForm } from "react-hook-form";
import {useMutation} from "react-query";
import * as apiClient from "../api-client";
import {Link, useNavigate} from "react-router-dom"

export type SignUpData = {
    email: string;
    username : string;
    password : string;
    confirmPassword: string;
}

const SignUp = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    
  } = useForm<SignUpData>();

  


  const mutation = useMutation(apiClient.signup,{
    onSuccess : ()=>{
        console.log("Done");
        navigate("/home");
    },
    onError:()=>{
        console.log("Some error has occured");
        alert("nahi hua")
    },
  })

  const style1 = {
    border : "1px solid black",
    width : "100%",
    
  }

  const style2 = {
    border : "1px solid gray"
  }



  const onSubmit = handleSubmit((data)=>{
    console.log(data);
    mutation.mutate(data);
  })

  return (
    <div className="container shadow-md ring-light-gray-500">


    <form className="flex flex-col gap-5 px-4 py-4 mt-20 rounded-2xl mx-4 bg-white" style={style1} onSubmit={onSubmit}>
    <h2 className="text-6xl font-semibold text-blue-600">Register yourself here</h2>
    <h2 className="text-3xl font-normal text-gray-700">Create your account in less than a minute</h2>
    <hr></hr>

    <div className="flex flex-col md:flex-row gap-5">
        
        <label className="text-gray-700 text-sm font-bold flex-1">
            Username :
            <input className="rounded w-full border py-1 px-2 font-normal" style={style2} {...register("username",{required:"User Name is required"})}></input>
            {errors.username && (
                <span className="text-red-500">{errors.username.message}</span>
            )}
        </label>
    </div>

    <div className="flex flex-col md:flex-row gap-5">

    <label className="text-gray-700 text-sm font-bold flex-1">
            Email :
            <input className="rounded w-full border py-1 px-2 font-normal"  style={style2}{...register("email",{
                required:true,
                validate:{
                    matchPattern : (value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid Email"
                }
            })}></input>
            {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
            )}
        </label>
    
    </div>

    <div className="flex flex-col md:flex-row gap-5">

    <label className="text-gray-700 text-sm font-bold flex-1">
            Password :
            <input type="password" className="rounded w-full border py-1 px-2 font-normal" style={style2}
             {...register("password",{required:"Password is required",
             minLength:{
                value:6,
                message:"Password must contain atleast 6 characters"
             }})}>

             </input>
            {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
            )}
        </label>
    <label className="text-gray-700 text-sm font-bold flex-1">
            Confirm Password :
            <input type="password" className="rounded w-full border py-1 px-2 font-normal" style={style2} {...register("confirmPassword",
            {required:"Confirm Password does not match!!",
            validate:(val)=>{
                if(!val){
                    return "This field is required"
                }else if(watch("password") !== val){
                    return "Passwords does not match!!"
                }
            }})}></input>
            {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword.message}</span>
            )}
        </label>
    </div>

    <span className="flex items-center justify-between">
          <span className="text-sm ">
            Already Registered?{" "}
            <Link className="underline" to="/">
              Login Here
            </Link>
          </span>
          
        
        <button type="submit" className="bg-white text-gray-700 font-bold w-fit py-1 px-2 hover:rounded-lg hover:bg-blue-500 hover:text-white">
            Create my Account
        </button>
        </span>


        

</form>
</div>
  );
};

export default SignUp;
