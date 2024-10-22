import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useUserContext from '../hooks/useUserContext'
import useForm from '../hooks/useForm'
import authService from '../api/authService'
import AuthForm from '../components/AuthForm'
import toast from 'react-hot-toast'


const LoginPage = () => {

    const { setIsUserLoggedIn, setUserProfile } = useUserContext()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (formData) => {

        authService.login(formData) 
            .then((response) => {
                setIsUserLoggedIn(true)
                setUserProfile(response.data.userData)
                localStorage.setItem(
                    'userProfile',
                    JSON.stringify(response.data.userData)
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
        { email: '', password: '' },
        onSubmit,
        'login'
    )

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg border ">

                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

                <AuthForm
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    formType="login"
                />

                <p className="text-center text-sm text-gray-600">
                    New User? 
                    <Link to="/signup" className="text-red-600 hover:underline"> Register here!</Link>
                </p>

            </div>
        </div>
    )
}

export default LoginPage
