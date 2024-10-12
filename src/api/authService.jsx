import axios from 'axios'

const authService = {

    login: async ({ email, password }) => {
        const response = await axios.post('http://localhost:3500/api/v1/user/login', { email, password }, { withCredentials: true })
        return response
    },

    signup: async ( data ) => {
        const response = await axios.post('http://localhost:3500/api/v1/user/signup', data, {withCredentials: true})
        return response
    },

    logout: async () => {
        const response = await axios.get('http://localhost:3500/api/v1/user/logout', { withCredentials: true })
        return response
    }
}

export default authService

