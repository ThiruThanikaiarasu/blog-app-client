import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useUserContext from '../hooks/useUserContext'
import useForm from '../hooks/useForm'
import authService from '../api/authService'
import AuthForm from '../components/AuthForm'
import toast from 'react-hot-toast'


const SignupPage = () => {
    const { setIsUserLoggedIn, setUserProfile } = useUserContext()
    const navigate = useNavigate()


    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (formData) => {
        
        const data = new FormData()
        // Append form fields and file to FormData
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('image', formData.image);

        authService.signup(data)
            .then((response) => {
                setIsUserLoggedIn(true)
                setUserProfile(response.data.userData)
                localStorage.setItem(
                    'userProfile',
                    JSON.stringify(response.data.userData)
                )
                localStorage.setItem('isUserLoggedIn', 'true')

                navigate('/')
                toast.success(`Account Created Successfully`)
            })
            .catch((error) => {
                console.log(error.message)
                if (error.response) {
                    if(error.response.status === 409) {
                        toast.error(`${error.response.data.message}`)
                    }
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
        { firstName: '', lastName: '', email: '', password: '', image: null },
        onSubmit,
        'signup'
    )

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">

                <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>

                <AuthForm
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    formType="signup"
                />

                <p className="text-center text-sm text-gray-600">
                    Already have an account? 
                    <Link to="/login" className="text-indigo-600 hover:underline"> Login here!</Link>
                </p>

            </div>
        </div>
    )
}

export default SignupPage
