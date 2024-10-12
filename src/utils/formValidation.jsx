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

const validateImage = (image, errors) => {
    if (!image) {
        errors.image = '* Image is required';
    } else {
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validImageTypes.includes(image.type)) {
            errors.image = '* Image must be a JPEG or PNG';
        } else if (image.size > 5 * 1024 * 1024) {
            // Limit file size to 5MB
            errors.image = '* Image size must be less than 5MB';
        }
    }
}

const validateLoginForm = ({ email, password }) => {
    const errors = {}
    validateEmail(email, errors)
    validatePassword(email, password)

    return errors
}

const validateSignupForm = ({ firstName, lastName, email, password, image }) => {
    const errors = {}
    
    validateFirstName(firstName, errors)
    validateLastName(lastName, errors)
    validateEmail(email, errors)
    validatePassword(password, errors)
    validateImage(image, errors)
    console.log(errors.image)

    return errors
}

export { validateSignupForm, validateLoginForm }
