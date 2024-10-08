const validateEmail = (email, errors) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
        errors.email = '* Email is required'
    } else if (!emailPattern.test(email)) {
        errors.email = '* Email must be a valid email address'
    }
}

const validatePassword = (password, errors) => {
    if (!password) errors.password = '* Password is required'
}

const validateFirstName = (firstName, errors) => {
    if (!firstName) errors.firstName = '* First Name is required'
}

const validateLastName = (lastName, errors) => {
    if (!lastName) errors.lastName = '* Last Name is required'
}

const validateLoginForm = ({ email, password }) => {
    const errors = {}
    validateEmail(email, errors)
    validatePassword(email, password)

    return errors
}

const validateSignupForm = ({ firstName, lastName, email, password }) => {
    const errors = {}
    
    validateFirstName(firstName, errors)
    validateLastName(lastName, errors)
    validateEmail(email, errors)
    validatePassword(password, errors)

    return errors
}

export { validateSignupForm, validateLoginForm }
