import React, { useCallback, useContext, useState } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import { useNavigate } from 'react-router-dom'
import useBlogContext from '../hooks/useBlogContext'
import ButtonComponent from './ButtonComponent'
import InputComponent from './InputComponent'

const BlogWritingComponent = () => {

    const navigate = useNavigate()
    const { blogData, setBlogData } = useBlogContext()
    const [ title, setTitle ] = useState(blogData?.title)
    const [blogContent, setBlogContent] = useState(blogData?.blogContent)
    const [errors, setErrors] = useState({})

    const toolbarOptions = [
        ["bold", "italic", "underline"],
        ["link"],
        [{list: "ordered"}, {list: "bullet"}],
        [{script: "sub"}, {script: "super"}],
    ];

    const wrapperRef = useCallback( (wrapper) => {
        if (wrapper == null) return
        wrapper.innerHTML = blogData.blogContent
        const editor = document.createElement('div')
        wrapper.append(editor)
        const quill = new Quill(".write-blog-container", {theme: "snow", modules: { toolbar: toolbarOptions}, placeholder: "Write the Blog here..."})

        quill.on('text-change', () => {
            setBlogContent(quill.root.innerHTML)
            if(blogContent.trim()) {
                setErrors(prevErrors => ({ ...prevErrors, blogContent: ""}))
            }
        })
    }, [])

    const handleBlogTitleChange = (event) => {
        setTitle(event.target.value)

        if(title.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, title: ""}))
        }
    }

    const handlePublish = () => {
        if(!validate()) {
            return
        }
        setBlogData(prevValue => ({
            ...prevValue,
            title,
            blogContent
        }))
        navigate("/write-details")
    }

    const validate = () => {
        const newErrors = {}
        if(!title.trim()) newErrors.title = "Title is required"

        if(!blogContent.trim()) newErrors.blogContent = "Content is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length == 0
    }

    return (
        <div className="pt-4 w-full max-w-4xl mx-auto h-full">
            {/* Sticky Button Container */}
            <div className="sticky top-20 z-10 flex justify-between items-center py-4 w-full bg-white">
                <div className="ml-4"></div>
                <ButtonComponent
                    onClick={handlePublish}
                    className="mr-4 bg-green-600 text-white py-2 px-4 rounded-full"
                >
                    Publish
                </ButtonComponent>
            </div>
    
            {/* Blog Title Input */}
            <div className="mb-4">
                <InputComponent 
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={handleBlogTitleChange}
                    className={`w-full py-3 px-4 mb-2 bg-gray-200 text-2xl rounded-md focus:outline-none ${errors.title ? 'border border-red-500' : ''}`}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
    
            {/* Blog Content Editor */}
            {errors.blogContent && <p className="text-red-500 text-sm">{errors.blogContent}</p>}
            <div className="quill-blog">
                <div className={`write-blog-container`} ref={wrapperRef}></div>
            </div>
        </div>
    )
    
}

export default BlogWritingComponent
