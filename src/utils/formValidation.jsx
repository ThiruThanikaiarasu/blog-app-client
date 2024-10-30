const validateEmail = (email, errors) => {
    if (!email) {
        errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Enter a valid Email address'
    }
}

const validatePassword = (password, errors) => {
    if (!password) {
        errors.password = 'Password is required'
    }
} 

const validatePasswordWithStrength = (password, errors, setPasswordStrength) => {

        let strengthScore = 0
        if (password.length >= 8) strengthScore++
        if (/[A-Z]/.test(password)) strengthScore++
        if (/[0-9]/.test(password)) strengthScore++
        if (/[^A-Za-z0-9]/.test(password)) strengthScore++

        setPasswordStrength(strengthScore)
        console.log(strengthScore)
}

const validateFirstName = (firstName, errors) => {
    if(!firstName) {
        errors.firstName = 'First Name is required'
    } else if (firstName.length >= 25) {
        errors.firstName = 'First Name must be less than 25 characters'
    }
}

const validateLastName = (lastName, errors) => {
    if(!lastName) {
        errors.lastName = 'Last Name is required'
    } else if (lastName.length >= 25) {
        errors.lastName = 'Last Name must be less than 25 characters'
    }
}

const validateLoginForm = ({ email, password }) => {
    let errors = {}
    
    validateEmail(email, errors)
    validatePassword(password, errors)
    
    return errors
}

const validateSignupForm = ({ firstName, lastName, email, password}) => {
    let errors = {}

    validateFirstName(firstName, errors)
    validatePassword(password, errors)
    validateLastName(lastName, errors)
    // validateEmail(email, errors)

    return errors
}

const validateSignupEmail = ({email}) => {
    let errors = {}

    validateEmail(email, errors)

    return errors
}

export { validateLoginForm, validateSignupForm, validateSignupEmail, validatePasswordWithStrength }
