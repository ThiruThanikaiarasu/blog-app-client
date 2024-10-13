import axios from "axios"

const blogService = {
    fetchBlogPosts: async () => {
        const response = await axios.get('http://localhost:3500/api/v1/blog/getPosts')

        return response
    },

    fetchBlogDetails: async ( slug ) => {
        const response = await axios.get(`http://localhost:3500/api/v1/blog/${slug}`, {withCredentials: true})

        return response
    },

    updateLikeStatus: async ( slug, newLikedStatus ) => {
        const response = await axios.post(`http://localhost:3500/api/v1/blog/${slug}/like`, { likedStatus: newLikedStatus }, { withCredentials: true })

        return response
    },

    updateBookmarkStatus: async ( slug, newBookmarkStatus ) => {
        const response = await axios.post(`http://localhost:3500/api/v1/blog/${slug}/bookmark`, {bookmarkedStatus: newBookmarkStatus }, { withCredentials: true })

        return response
    },

    addComment: async ( slug, commentText ) => {
        const response = await axios.post(`http://localhost:3500/api/v1/blog/${slug}/addComment`, { text: commentText }, { withCredentials: true })

        return response
    },

    editComment: async ( slug, text, commentId ) => {
        const response = await axios.patch(`http://localhost:3500/api/v1/blog/${slug}/editComment`, { text, commentId }, {withCredentials: true })

        return response
    },

    addReplyComment: async ( slug, parentComment, text ) => {
        const response = await axios.post(`http://localhost:3500/api/v1/blog/${slug}/addReplyComment`, { slug, parentComment, text }, {withCredentials: true})

        return response
    },

    fetchReplyComments: async ( slug, parentComment ) => {
        const response = await axios.post(`http://localhost:3500/api/v1/blog/${slug}/getReplyComments`, { parentComment }, { withCredentials: true })

        return response
    },

    fetchUserPostsAndBookmarks: async () => {
        const response = await axios.get(`http://localhost:3500/api/v1/user/posts`, {withCredentials: true})

        return response
    }
}

export default blogService