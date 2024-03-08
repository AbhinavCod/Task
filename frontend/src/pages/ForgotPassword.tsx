import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";

export type UpdateFormData = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

const ForgotPassword = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormData>();

  const style2 = {
    border: "1px solid gray",
  };

  const mutation = useMutation(apiClient.forgotPassword,{
    onSuccess : async (userId)=>{
        console.log(userId)
        navigate(`/`);
    },
    onError:()=>{
        alert("Invalid Credentials!!!");
        console.log("Invalid Credentials");
    }
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data);
  });

  return (
    <div
      className="container shadow-lg mx-auto"
      style={{ width: "60rem", height: "30rem" }}
    >
      <form
        className="flex flex-col gap-8 px-4 py-4 mt-20 rounded-2xl mx-4 bg-white"
        style={{ border: "1px solid gray", width: "100%", height: "32rem" }}
        onSubmit={onSubmit}
      >
        <h2 className="text-6xl text-center font-semibold text-blue-600 py-10">
          Update Your Password
        </h2>

        <hr></hr>

        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email :
            <input
              className="rounded w-full border py-1 px-2 font-normal"
              style={style2}
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid Email",
                },
              })}
            ></input>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            Old Password :
            <input
              type="password"
              className="rounded w-full border py-1 px-2 font-normal"
              style={style2}
              {...register("oldPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must contain atleast 6 characters",
                },
              })}
            ></input>
            {errors.oldPassword && (
              <span className="text-red-500">{errors.oldPassword.message}</span>
            )}
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            New Password :
            <input
              type="password"
              className="rounded w-full border py-1 px-2 font-normal"
              style={style2}
              {...register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must contain atleast 6 characters",
                },
              })}
            ></input>
            {errors.newPassword && (
              <span className="text-red-500">{errors.newPassword.message}</span>
            )}
          </label>
        </div>

        <div className="flex justify-between">
        <button
          type="submit"
          className="bg-white text-gray-700 font-bold w-fit py-1 px-2 ml-5 hover:rounded-lg hover:text-white"
        >
          <Link to={"/"} className="text-2xl">⬅️</Link>
        </button>

        <button
          type="submit"
          className="bg-white text-gray-700 font-bold w-fit py-2 px-2 mr-6 hover:rounded-lg hover:bg-blue-500 hover:text-white"
        >
          Update Password
        </button>

        </div>



      </form>
    </div>
  );
};

export default ForgotPassword;
