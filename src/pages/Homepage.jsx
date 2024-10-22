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
        return blogPost.map((blog, index) => (
            <div key={blog.slug} className={`w-full max-w-[1024px] md:max-w[450px] my-3 ${index === blogPost.length - 1 ? '' : 'border-b-2'}`}>
                <BlogListComponent blog={blog} />
            </div>
        ))
    }, [blogPost])

    return (
        <div className="mt-24 flex justify-center items-center w-full">
            <div className="w-full flex flex-col justify-center items-center">
                {isLoading ? <LoadingComponent /> : memoizedBlogList}
            </div>
        </div>
    )
}

export default Homepage
