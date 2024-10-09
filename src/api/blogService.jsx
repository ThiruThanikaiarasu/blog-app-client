import axios from "axios"

const blogService = {
    fetchBlogPosts: async () => {
        const response = await axios.get('http://localhost:3500/api/v1/blog/getPosts')

        return response
    }
}

export default blogService