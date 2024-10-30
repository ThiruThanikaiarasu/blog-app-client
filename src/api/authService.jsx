import axiosInstance from '../utils/axiosInstance'

const authService = {

    login: async ({ email, password }) => {
        const response = await axiosInstance.post('/user/login', { email, password })
        return response
    },

    signup: async ( data ) => {
        const response = await axiosInstance.post('/auth/signup', data)
        return response
    },

    logout: async () => {
        const response = await axiosInstance.get('/user/logout')
        return response
    }, 

    requestGoogleAuthUrl: async() => {
        const response = await axiosInstance.get('/google-auth/page-request')

        return response
    },

    requestEmailVerification: async ( email ) => {
        const response = await axiosInstance.post('/auth/signup/request-verification', { email })

        return response
    },

    validateOtpCode: async ( email, otp ) => {
        const response = await axiosInstance.post('/auth/signup/otp-verify', { email, otp })

        return response
    }
}

export default authService

