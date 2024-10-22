import axiosInstance from "../utils/axiosInstance"

const blogService = {
    addBlogPost: async (formData) => {
        const response = await axiosInstance.post('/blog/addBlog', formData)

        return response
    },

    fetchHomeFeed: async () => {
        const response = await axiosInstance.get('/blog/feed')

        return response
    },

    fetchBlogPosts: async () => {
        const response = await axiosInstance.get('/blog/getPosts')

        return response
    },

    fetchBlogDetailsBySlug: async ( slug ) => {
        const response = await axiosInstance.get(`/blog/${slug}`)

        return response
    },

    fetchBlogDetails: async ( slug ) => {
        const response = await axiosInstance.get(`/blog/${slug}/details`)

        return response
    },

    updateLikeStatus: async ( slug, newLikedStatus ) => {
        const response = await axiosInstance.post(`/blog/${slug}/like`, { likedStatus: newLikedStatus })

        return response
    },

    updateBookmarkStatus: async ( slug, newBookmarkStatus ) => {
        const response = await axiosInstance.post(`/blog/${slug}/bookmark`, {bookmarkedStatus: newBookmarkStatus })

        return response
    },

    addComment: async ( slug, commentText ) => {
        const response = await axiosInstance.post(`/blog/${slug}/addComment`, { text: commentText })

        return response
    },

    editComment: async ( slug, text, commentId ) => {
        const response = await axiosInstance.patch(`/blog/${slug}/editComment`, { text, commentId })

        return response
    },

    addReplyComment: async ( slug, parentComment, text ) => {
        const response = await axiosInstance.post(`/blog/${slug}/addReplyComment`, { slug, parentComment, text })

        return response
    },

    fetchReplyComments: async ( slug, parentComment ) => {
        const response = await axiosInstance.post(`/blog/${slug}/getReplyComments`, { parentComment })

        return response
    },

    fetchUserPostsAndBookmarks: async () => {
        const response = await axiosInstance.get(`/user/posts`)

        return response
    }
}

export default blogService