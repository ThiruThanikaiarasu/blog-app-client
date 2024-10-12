import React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import InputComponent from './InputComponent'
import ButtonComponent from './ButtonComponent'

const FormInputComponent = ({ 
    label, 
    type = 'text', 
    name, 
    value, 
    onChange, 
    error, 
    showPassword, 
    togglePasswordVisibility 
}) => {
    return (
        <div className="mb-4">

            <label className={`block text-sm font-medium text-gray-700 ${name == 'lastName' ? 'ml-4' : 'ml-0' }`}>
                {label}
            </label>

            <div className="relative">
                <InputComponent 
                    type={type === 'password' && showPassword ? 'text' : type}
                    name={name}
                    className={`mt-1 p-2 w-full border ${name == 'lastName' ? 'ml-4' : 'ml-0' } ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    value={value}
                    onChange={onChange}
                />
                {type === 'password' && (
                    <ButtonComponent
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                        {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                    </ButtonComponent>
                )}
            </div>

            {error && 
                <p className="text-red-500 text-sm">
                    {error}
                </p>
            }

        </div>
    )
}

export default FormInputComponent
