import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {
    const { setIsLoggedIn, setUserProfile } = useUserContext()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const validateForm = () => {
        const newErrors = {}
        if (!email) newErrors.email = '* Email is required'
        if (!password) newErrors.password = '* Password is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const formSubmitHandler = (event) => {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        axios
            .post(`http://localhost:3500/api/v1/user/login`,
                {
                    email: email,
                    password: password
                },
                {
                    withCredentials: true,
                })
            .then((response) => {
                if (response.status === 200) {
                    setIsLoggedIn(true)
                    setUserProfile(response.data.userData)
                    localStorage.setItem('isLoggedIn', true)
                    localStorage.setItem('userProfile', JSON.stringify(response.data.userData))
                    alert(`Welcome ${response.data.message}!`)
                    navigate('/')
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setErrors({ apiError: error.response.data.message })
                }
                if (error.response.status === 500) {
                    setErrors({ apiError: 'Something went wrong, try again later' })
                }
            })
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                {errors.apiError && <p className="text-red-500 text-center">{errors.apiError}</p>}
                <form onSubmit={formSubmitHandler}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className={`mt-1 p-2 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                            placeholder="Enter your email address"
                            value={email}
                            onChange={emailHandler}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`mt-1 p-2 w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Enter your password"
                                value={password}
                                onChange={passwordHandler}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700"
                        >
                            Submit
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        New User? <Link to="/signup" className="text-indigo-600 hover:underline">Register here!</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
