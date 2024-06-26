import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import {Button, Input, Logo} from "./index";
import {useDispatch} from "react-redux";
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form";
import { FaEye,FaEyeSlash } from "react-icons/fa";

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit,formState: { errors }} = useForm()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                console.log(userData);
                if(userData) dispatch(authLogin(userData));
                navigate("/")
                
            }
        } catch (error) {
            setError(error.message)
        }
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-left">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
            <div className='flex flex-col'>
                        <label htmlFor="Email" className=' mt-1 text-sm font-bold text-black/60 text-center'>Email</label>
                        <Input
                        // className="block w-full px-4 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                        id="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Email address must be a valid address",   
                            }         
                            }
                        )}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

                        <div className='flex flex-col'>
                        <div className='relative'>
                        <label htmlFor="Password" className=' mt-1 text-sm font-bold text-black/60 text-center'>Password</label>
                        <Input
                        // className="block align-items justify-content w-full px-4 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                        id="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                            pattern : {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                            message: "Password must contain at least 8 characters and include at least one uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.",
                            }
                        },
                    )}
                        />
                        
                        <button
                        type="button"
                        className="absolute bottom-2 right-0 px-1 py-1 text-gray-600 focus:outline-none width-[16px]"
                        onClick={togglePasswordVisibility}
                        >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login