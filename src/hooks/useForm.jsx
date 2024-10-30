import {  useState } from 'react'
import useUserContext from '../hooks/useUserContext'
import { validateLoginForm, validateSignupForm, validateSignupEmail, validatePasswordWithStrength } from '../utils/formValidation'

const useForm = (onSubmit, formType) => {
    const { signupFormData, setSignupFormData } = useUserContext()
    const [errors, setErrors] = useState({})
    const [passwordStrength, setPasswordStrength] = useState(0)

    const handleChange = (event) => {
        const { name, value } = event.target
        setSignupFormData((prevData) => ({ ...prevData, [name]: value }))
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }))

        if (name === 'password') {
            const fieldErrors = {}
            validatePasswordWithStrength(value, fieldErrors, setPasswordStrength) 
            setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let validationErrors
        if (formType === 'login') {
            validationErrors = validateLoginForm(signupFormData)
        } else if (formType === 'signup-email') {
            validationErrors = validateSignupEmail(signupFormData)
        } else if (formType === 'signup-submit') {
            validationErrors = validateSignupForm(signupFormData)
        } else {
            validationErrors = validateSignupForm(signupFormData)
        }
        console.log(validationErrors)
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(signupFormData)
        } else {
            setErrors(validationErrors)
        }
    }

    return { formData: signupFormData, errors, handleChange, handleSubmit, setErrors, passwordStrength }
}

export default useForm
