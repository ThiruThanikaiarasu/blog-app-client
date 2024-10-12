import axios from 'axios'
import React, { useMemo } from 'react'
import BlogListComponent from '../components/BlogListComponent'
import useBlogContext from '../hooks/useBlogContext'
import useFetchBlogs from '../hooks/useFetchBlogs'
import LoadingComponent from '../components/LoadingComponent'

const Homepage = () => {
    const { blogPost } = useBlogContext()

    const isLoading = useFetchBlogs()

    const memoizedBlogList = useMemo(() => {
        return blogPost.map((blog) => (
            <div key={blog.slug} className="my-2">
                <BlogListComponent blog={blog} />
            </div>
        ))
    }, [blogPost])

    return (
        <div>
            <div style={{ marginTop: "20px" }}>
                {isLoading ? <LoadingComponent /> : memoizedBlogList}
            </div>
        </div>
    )
}

export default Homepage
