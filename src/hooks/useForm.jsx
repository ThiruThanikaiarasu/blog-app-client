import { useState } from 'react'
import { validateSignupForm, validateLoginForm} from '../utils/formValidation'

const useForm = (initialState, onSubmit, formType) => {

    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let validationErrors
        if( formType == 'login') {
            validationErrors = validateLoginForm(formData)
        } else {
            validationErrors = validateSignupForm(formData)
        }
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(formData)
        } else {
            setErrors(validationErrors)
        }
    }

    return { formData, errors, handleChange, handleSubmit }
}

export default useForm
