import axiosInstance from '../utils/axiosInstance'

const authService = {

    login: async ({ email, password }) => {
        const response = await axiosInstance.post('/user/login', { email, password })
        return response
    },

    signup: async ( data ) => {
        const response = await axiosInstance.post('/user/signup', data)
        return response
    },

    logout: async () => {
        const response = await axiosInstance.get('/user/logout')
        return response
    }
}

export default authService

