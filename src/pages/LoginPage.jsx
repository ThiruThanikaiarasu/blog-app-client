import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useUserContext from '../hooks/useUserContext'
import useForm from '../hooks/useForm'
import authService from '../api/authService'
import AuthForm from '../components/AuthForm'
import toast from 'react-hot-toast'
import ButtonComponent from '../components/ButtonComponent'
import google_logo from '../../src/assets/img/google-logo.svg'

const LoginPage = () => {

    const { setIsUserLoggedIn, setUserProfile, setSignupFormData } = useUserContext()

    
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleGoogleSignInAuth = async () => {
        setIsLoading(true)
        authService.requestGoogleAuthUrl()
            .then((response) => {
                console.log(response.data.data)
                if(response.status == 200) {
                    window.location.href = response.data.data
                }
            })
            .catch((error) => {
                console.log(error.response.status)
                if (!error.response) {
                    toast.error('No internet connection. Please check your network.');
                } else if (error.response.status === 500) {
                    toast.error('Server error. Please try again later.');
                } else {
                    toast.error('Something went wrong. Please try again.');
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
        }

    const onSubmit = async (formData) => {
        console.log("first")
        authService.login(formData) 
            .then((response) => {
                setIsUserLoggedIn(true)
                setUserProfile(response.data.data)
                localStorage.setItem(
                    'userProfile',
                    JSON.stringify(response.data.data)
                )
                localStorage.setItem('isUserLoggedIn', 'true')
                navigate('/')
                toast.success('Logged In Successfully')
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error(`${error.response.data.message}`)
                    } else if (error.response.status === 500) {
                        toast.error(`${error.response.data.message}`)
                    }
                } else {
                    toast.error(`${error.response.data.message}`)
                }
            })

    }

    const { formData, errors, handleChange, handleSubmit, setErrors } = useForm(
        // { email: '', password: '' },
        onSubmit,
        'login'
    )

    return (
        <div className="flex items-center justify-center" style={{height: 'calc(100vh - 80px)'}}>
            <div className="w-full max-w-md bg-white p-8 rounded-lg border ">

                <h1 className="text-2xl font-bold text-center mb-1">Login</h1>

                <p className="text-center text-sm text-gray-600 mb-5">
                    New User? 
                    <Link to="/signup" className="text-red-600 hover:underline"> Register here!</Link>
                </p>

                <ButtonComponent
                    className="flex justify-center items-center border px-4 py-2 w-full gap-3 mb-4"
                    onClick={handleGoogleSignInAuth}
                >
                    <img 
                        src={google_logo} 
                        alt="" 
                        className="h-8 w-8"    
                    />
                    Sign in with Goggle
                </ButtonComponent>

                <div className="flex items-center w-full mb-4">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="px-2 text-gray-500 text-sm">or</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>

                <AuthForm
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    formType="login"
                    isLoading={isLoading}
                />

            </div>
        </div>
    )
}

export default LoginPage
