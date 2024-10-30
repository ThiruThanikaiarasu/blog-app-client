import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'

import useUserContext from '../../hooks/useUserContext'
import authService from '../../api/authService'
import { useNavigate } from 'react-router-dom'


const SignupEmailVerification = () => {
    const navigate = useNavigate()

    const { signupFormData, setSignupFormData } = useUserContext()
    if(signupFormData.email) {
        localStorage.setItem('email', signupFormData.email)
    }
    const email = localStorage.getItem('email')
    if(!email) {
        toast.error("Error fetching email. Try again")
        navigate('/signup')
    }

    const inputsRef = useRef([])

    const [otp, setOtp] = useState(new Array(6).fill(""))
    const [otpError, setOtpError] = useState(false)

    const [isResendLoading, setIsResendLoading] = useState(false)

    const handleInputChange = (index, newValue) => {
        if (/^[0-9]?$/.test(newValue)) {
            setOtpError(false)
            const newOtp = [...otp]
            newOtp[index] = newValue
            setOtp(newOtp)
    
            if (newValue && index < otp.length - 1) {
                const nextInput = inputsRef.current[index + 1] 
                if (nextInput) {
                    nextInput.focus()
                }
            }
        }
    }
    
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            setOtpError(false)

            const newOtp = [...otp]
            if (!newOtp[index] && index > 0) {
                newOtp[index - 1] = ''
                setOtp(newOtp)
                const prevInput = inputsRef.current[index - 1]
                if (prevInput) {
                    prevInput.focus()
                }
            } else {
                newOtp[index] = ''
                setOtp(newOtp)
            }
        }
    }
    

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('Text')
        if (/^\d{6}$/.test(pasteData)) {
            setOtpError(false)

            const newOtp = pasteData.split('')
            setOtp(newOtp)

            const lastInput = document.getElementById(
                `otp-${newOtp.length - 1}`
            )
            lastInput.focus()
        }
        e.preventDefault()
    }

    const handleEmailVerificationSubmit = (event) => {
        event.preventDefault()
        const otpCode = otp.join('')
        if(otpCode.length != 6) {
            setOtpError(true)
            return
        }
        authService.validateOtpCode(email, otpCode)
            .then((response) => {
                if (response.status === 200) {
                    navigate('/signup/profile')
                }
            })
            .catch((error) => {
                if (!error.response) {
                    toast.error('No internet connection. Please check your network.')
                } else if(error.response.status == 410) {
                    setOtpError(true)
                    toast.error("OTP Expired, please try again")
                } else if(error.response.status == 401){
                    setOtpError(true)
                    toast.error("Incorrect Pin")
                } else if (error.response.status === 500) {
                    toast.error('Server error. Please try again later.')
                } else {
                    toast.error('Something went wrong. Please try again.')
                }
                
            })
    }

    const handleEmailOnClickToOpenMail = () => {
        window.location.href = 'mailto:' + signupFormData.email 
    }

    const handleOtpResend = () => {
        setIsResendLoading(true)
        authService.requestEmailVerification(email)
            .then((response) => {
                if (response.status === 200) {
                    setOtp(new Array(6).fill(""))
                    setOtpError(false)
                    toast.success('OTP resent successfully')
                }
            })
            .catch((error) => {
                console.log(error.response)
                if (!error.response) {
                    toast.error('No internet connection. Please check your network.')
                } else if (error.response.status === 409) {
                    toast.error('Email already exists. Try to log in.')
                } else if (error.response.status === 429) {
                    toast.error("You've reached the maximum number of attempts. Please try again later.")
                } else if (error.response.status === 500) {
                    toast.error('Server error. Please try again later.')
                } else {
                    toast.error('Something went wrong. Please try again.')
                }
            })
            .finally(() => {
                setIsResendLoading(false)
            })
    }

    const handleChangeEmail = () => {
        localStorage.removeItem('email')
        setSignupFormData((prevData) => ({
            ...prevData,
            email: ''
        }))
        navigate('/signup')
    }

    return (
        <div className="relative font-inter antialiased">
            <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
                <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
                    <div className="flex justify-center">
                        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl border">
                            <header className="mb-8">
                                <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
                                <p className="text-[15px] text-start text-slate-500">
                                    Enter the 6-digit verification code that was sent to 
                                    <button className="text-red-500" onClick={handleEmailOnClickToOpenMail}>
                                        {email}
                                    </button>.
                                </p>
                            </header>
                            <form id="otp-form" onSubmit={handleEmailVerificationSubmit}>
                                <div className="flex items-center justify-center gap-3">
                                    {otp.map((digit, index) => (
                                        <input
                                        key={index}
                                        ref={(el) => (inputsRef.current[index] = el)} 
                                        id={`otp-${index}`}
                                        name={`otp-${index}`}
                                        type='text'
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        maxLength={1}
                                        className={`w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-slate-300 hover:border-slate-400 appearance-none rounded p-4 outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${otpError ? 'border-red-300' : ''}`}
                                    />
                                    ))}
                                </div>
                                <div className="max-w-[260px] mx-auto mt-4">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-red-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-950/10 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-red-300 transition-colors duration-150"
                                    >
                                        Verify Account
                                    </button>
                                </div>
                            </form>
                            <div className="text-sm text-slate-500 mt-4">
                                Didn't receive code?{' '}
                                <button 
                                    className="font-medium text-red-500 hover:text-red-600"
                                    onClick={handleOtpResend}
                                >
                                    {isResendLoading ? 'Sending OTP...' : 'Resend'}
                                </button>
                            </div>
                            <div className="text-sm text-slate-500 mt-1">
                                Wrong email?{' '}
                                <button 
                                    className="font-medium text-red-500 hover:text-red-600"
                                    onClick={handleChangeEmail}
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SignupEmailVerification
