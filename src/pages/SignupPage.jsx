import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useUserContext from '../hooks/useUserContext'
import useForm from '../hooks/useForm'
import authService from '../api/authService'
import AuthForm from '../components/AuthForm'


const SignupPage = () => {
    const { setIsUserLoggedIn, setUserProfile } = useUserContext()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = async (formData) => {

        authService.signup(formData)
            .then((response) => {
                setIsUserLoggedIn(true)
                setUserProfile(response.data.userData)
                alert(`Welcome ${response.data.message}!`)
                navigate('/')
            })
            .catch((error) => {
                if (error.response) {
                    if(error.response.status === 409) {
                        console.log(error)
                    }
                    if (error.response.status === 401) {
                        // setErrors({ apiError: error.response.data.message })
                        console.log(error)
                    } else if (error.response.status === 500) {
                        // setErrors({ apiError: 'Something went wrong, try again later' })
                        console.log(error)
                    }
                } else {
                    // setErrors({ apiError: 'Network error, please try again' })
                    console.log(error)
                }
            })

    }

    const { formData, errors, handleChange, handleSubmit, setErrors } = useForm(
        { firstName: '', lastName: '', email: '', password: '' },
        onSubmit,
        'signup'
    )

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

                <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

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
