import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from '../api-client';
import { useEffect } from "react";

export type SignInFormData = { 
    email: string,
    password: string
}

const SignIn = () => {
    
    const { showToast, isInSignIn } = useAppContext();
    const queryClient = useQueryClient();
    const location = useLocation();

    useEffect(() => {
        isInSignIn(true);
    })
    const { register, handleSubmit, formState: {errors}} = useForm<SignInFormData>();

    const navigate = useNavigate();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => { 
            showToast({message: "Sign In Successful!", type:"SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate(location.state?.from?.pathname || "/");
        },
        onError: (error: Error) => {
            showToast({message: error.message, type:"ERROR"});
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

  return (
    <form action="" className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Sign In</h2>
        <div className="flex flex-col gap-5">
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("email", {required: "*This field is required"})}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("password", {required: "*This field is required", minLength: {
                        value: 6, 
                        message: "Password must be longer than 6 characters"
                    }})}
                />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
        </div>

        <span className="flex items-center justify-between">
            <span className="text-sm">Not Registered? <Link className="underline hover:text-blue-300" to={"/register"}>Create an account here</Link></span>
            <button type="submit" className="bg-green-400 rounded-lg text-white p-2 font-bold hover:bg-green-500 text-lg">
                Login
            </button>
        </span>

      </form>
  )
}

export default SignIn
