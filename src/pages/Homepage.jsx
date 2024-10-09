import axios from 'axios'
import React, { useMemo } from 'react'
import BlogListComponent from '../components/BlogListComponent'
import useBlogContext from '../hooks/useBlogContext'
import useFetchBlogs from '../hooks/useFetchBlogs'

const Homepage = () => {
    const { blogPost } = useBlogContext()

    useFetchBlogs()

    const memoizedBlogList = useMemo(() => {
        return blogPost.map((blog) => (
            <div key={blog.slug}>
                <BlogListComponent blog={blog} />
            </div>
        ))
    }, [blogPost])

    return (
        <div>
            <div style={{ marginTop: "20px" }}>
                {memoizedBlogList}
            </div>
        </div>
    )
}

export default Homepage
