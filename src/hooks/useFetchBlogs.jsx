// src/hooks/useFetchBlogs.js
import { useEffect } from 'react'
import useBlogContext from './useBlogContext'
import blogService from '../api/blogService'

const useFetchBlogs = () => {
    const { setBlogPost } = useBlogContext()

    useEffect(() => {
        const fetchBlogs = async () => {
            blogService.fetchBlogPosts()
                .then((response) => {
                    console.log(response)
                    if(response.status == 200) {
                        setBlogPost(response.data.data)
                    }
                })
                .catch((error) => {
                    console.error('Error fetching blog posts:', error)
                })
        }
        
        fetchBlogs()
    }, [setBlogPost])
}

export default useFetchBlogs
