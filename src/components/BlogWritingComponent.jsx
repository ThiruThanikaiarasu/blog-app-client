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
        })
    }, [])

    const handleBlogTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handlePublish = () => {
        setBlogData(prevValue => ({
            ...prevValue,
            title,
            blogContent
        }))
        navigate("/write-details")
    }

    return (
        <div className="mt-4 w-full max-w-4xl mx-auto h-full">
            <div className="sticky top-0 z-10 flex justify-between items-center py-4 bg-white">
                <div className="ml-4"></div>
                <ButtonComponent
                    onClick={handlePublish}
                    className="mr-4 bg-green-600 text-white py-2 px-4 rounded-full"
                >
                    Publish
                </ButtonComponent>
            </div>
            <div className="mb-4">
                <InputComponent 
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={handleBlogTitleChange}
                    className="w-full py-3 px-4 mb-2 bg-gray-200 text-2xl rounded-md focus:outline-none"
                ></InputComponent>
            </div>
            <div className="quill-blog">
                <div className="write-blog-container" ref={wrapperRef}></div>
            </div>
        </div>
    )
}

export default BlogWritingComponent
