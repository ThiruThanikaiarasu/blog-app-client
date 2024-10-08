import React from 'react'
import FormInputComponent from './FormInputComponent'
import ButtonComponent from './ButtonComponent'

const AuthForm = ({
    formData,
    errors,
    handleChange,
    handleSubmit,
    showPassword,
    togglePasswordVisibility,
    formType 
}) => {
    return (
        <form onSubmit={handleSubmit}>
            {formType === 'signup' && (
                <>
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
                </>
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
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700"
                >
                    {formType === 'signup' ? 'Sign Up' : 'Login'}
                </ButtonComponent>
            </div>
        </form>
    )
}

export default AuthForm
