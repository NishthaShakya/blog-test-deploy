import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import { FaEye,FaEyeSlash } from "react-icons/fa";

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const {register, handleSubmit,
        formState: { errors }
    } = useForm()
   

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                console.log(userData);
                if(userData) dispatch(login(userData));
                navigate("/")
                console.log(userData);
            }
        } catch (error) {
            setError(error.message)
        }
    }
    
    const handleVerification = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const secret = urlParams.get('secret');
        const userId = urlParams.get('userId');

        if (secret && userId) {
            try {
                await authService.updateVerification(userId, secret);
                
                alert("Email verification successful!");
                navigate("/login");
            } catch (error) {
                setError(error.message);
            }
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                    <div className='flex flex-col'>
                        <label htmlFor='name' className=' mt-1 text-sm font-bold text-black/60 text-center'>Full Name</label>
                        <Input 
                        id= "name" 
                        // className="block w-full px-4 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">Full name is required</p>}
                        </div>

                        <div className='flex flex-col'>
                        <label htmlFor="Email" className=' mt-1 text-sm font-bold text-black/60 text-center'>Email</label>
                        <Input
                        // className="block w-full px-4 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                        id="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Email address must be a valid address",   
                            }         
                            },
                        )}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div className='flex flex-col'>
                        <div className='relative'>
                        <label htmlFor="Password" className=' mt-1 text-sm font-bold text-black/60 text-center'>Password</label>
                        <Input
                        className="block align-items justify-content w-full px-4 py-2 mt-1 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                        id="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
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
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup