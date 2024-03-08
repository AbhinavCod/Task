import { useForm } from "react-hook-form";
import { useMutation} from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";

export type LoginFormData = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  // const {showToast} = useAppContext();
  const mutation = useMutation(apiClient.login,{

      onSuccess : async (userId)=>{
          console.log(userId)
          navigate(`/home`);
      },
      onError:()=>{
          alert("Invalid Credentials!!!");
          console.log("Invalid Credentials");
      }
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const style2 = {
    border: "1px solid gray",
  };

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
        style={{ border: "1px solid gray", width: "100%", height: "30rem" }}
        onSubmit={onSubmit}
      >
        <h2 className="text-6xl text-center font-semibold text-blue-600 py-10">
          Login To Continue
        </h2>

        <hr></hr>

        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            Username :
            <input
              className="rounded w-full border py-1 px-2 font-normal"
              style={style2}
              {...register("username", { required: "User Name is required" })}
            ></input>
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-gray-700 text-sm font-bold flex-1">
            Password :
            <input
              type="password"
              className="rounded w-full border py-1 px-2 font-normal"
              style={style2}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must contain atleast 6 characters",
                },
              })}
            ></input>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>
        </div>

        
        
        <span className="flex items-center justify-between">


          <span className="text-sm ">
            Not Registered?{" "}
            <Link className="underline" to="/signup">
              Create an account here
            </Link>
          </span>


          <span className="text-sm ">
            Forgot Password?{" "}
            <Link className="underline" to="/forgot-password">
              Create new one
            </Link>
          </span>

          <button
            type="submit"
            className="bg-white text-gray-700 font-bold w-fit py-1 px-2 hover:rounded-lg hover:bg-blue-500 hover:text-white"
          >
            Login my account
          </button>
        </span>
      </form>
    </div>
  );
};

export default Login;
