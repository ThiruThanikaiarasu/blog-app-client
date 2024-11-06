import { useRef } from "react"
import ButtonComponent from "./ButtonComponent"
import FormInputComponent from "./FormInputComponent"

import profileImage from '../assets/img/profileImageSignup.jpg'

const AuthForm = ({
    formData,
    errors,
    handleChange,
    handleSubmit,
    showPassword,
    togglePasswordVisibility,
    formType,
    isLoading
}) => {

    const fileInputRef = useRef()

    const handleImageBoxClick = () => {
        fileInputRef.current.click()
    }

    const handleImage = (event) => {
        const file = event.target.files[0]
        // Set the image file in formData
        handleChange({ target: { name: 'image', value: file } })
    }

    return (
        <form onSubmit={handleSubmit}>
            {formType === 'signup' && (
                <div>
                    <div className="w-full flex flex-col items-center justify-center mb-6">
                        <div 
                            className={`flex items-center justify-center w-36 h-36 mt-2 rounded-full bg-gray-200 cursor-pointer overflow-hidden ${errors.image ? 'border-2 border-red-500' : ''}`} 
                            onClick={handleImageBoxClick}
                            title="Upload Profile Image"
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleImage} 
                                accept="image/png, image/jpg, image/jpeg" 
                                className="hidden" 
                            />
                            {formData.image ? (
                                <img src={URL.createObjectURL(formData.image)} className="object-cover w-full h-full rounded-full" alt="Profile Image" />
                            ) : (
                                <img src={profileImage} className="object-cover w-full h-full rounded-full" alt="Profile Image" />
                            )}
                        </div>
                        {errors?.image && 
                            <p className="text-red-500 text-sm">
                                {errors?.image}
                            </p>
                        }
                    </div>

                    <div className="flex">
                        <FormInputComponent
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            error={errors.firstName}
                        />
                        <FormInputComponent
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                        />
                    </div>
                </div>
            )}

            <FormInputComponent
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            <FormInputComponent
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
            />

            <div className="mb-4">
                <ButtonComponent
                    type="submit"
                    className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                >
                    {isLoading 
                        ? (formType === 'signup' ? 'Signing up...' : 'Logging in...') 
                        : (formType === 'signup' ? 'Sign Up' : 'Login')
                    }

                </ButtonComponent>
            </div>
        </form>
    )
}

export default AuthForm