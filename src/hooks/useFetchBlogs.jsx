// src/hooks/useFetchBlogs.js
import { useEffect, useState } from 'react'
import useBlogContext from './useBlogContext'
import blogService from '../api/blogService'
import { toast } from 'react-hot-toast'
import removeLocalStorage from '../utils/removeLocalStorage'
import { useNavigate } from 'react-router-dom'

const useFetchBlogs = () => {

    const navigate = useNavigate()

    const { setBlogPost } = useBlogContext()
    const [isLoading, setIsLoading] = useState(true) 

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogService.fetchBlogPosts()
                if (response.status === 200) {
                    setBlogPost(response.data.data)
                }
            } catch (error) {
                if(error.response.status == 401) {
                    removeLocalStorage()
                    navigate('/login')
                    toast.error('Session Expired, Login Again to continue.')
                }
                if (error.response && error.response.status === 500) {
                    toast.error(`${error.response.data.message}`)
                } else {
                    toast.error(`${error.message || "An error occurred"}`)
                }
            } finally {
                setIsLoading(false) 
            }
        }

        fetchBlogs()
    }, [setBlogPost])

    return isLoading 
}

export default useFetchBlogs
