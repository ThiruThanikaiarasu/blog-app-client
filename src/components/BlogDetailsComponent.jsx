import React, { useRef, useState } from 'react'
import useBlogContext from '../hooks/useBlogContext'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from './ButtonComponent'
import toast from 'react-hot-toast'
import blogService from '../api/blogService'
import removeLocalStorage from '../utils/removeLocalStorage'

const BlogDetailsComponent = () => {
    const navigate = useNavigate()
    const fileInputRef = useRef()
    const { blogData, setBlogData } = useBlogContext()
    const [description, setDescription] = useState(blogData.description || "")
    const [tag, setTag] = useState(blogData.tag || "")
    const [image, setImage] = useState(blogData.image || null)
    const [errors, setErrors] = useState({}) 
    const [isLoading, setIsLoading] = useState(false)

    const handleImageBoxClick = () => {
        fileInputRef.current.click()
    }

    const handleKeepEditing = () => {
        navigate('/write')
    }

    const handleImage = (event) => {
        const file = event.target.files[0]
        setImage(file)
        setBlogData(prevValue => ({
            ...prevValue,
            image: file
        }))

        if (file) {
            setErrors(prevErrors => ({ ...prevErrors, image: "" }))
        }
    }

    const handleDescription = (event) => {
        const description = event.target.value
        setDescription(description)
        setBlogData(prevValue => ({
            ...prevValue,
            description
        }))

        if (description.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, description: "" }))
        }
    }

    const handleTag = (event) => {
        const tag = event.target.value
        setTag(tag.trim())
        setBlogData(prevValue => ({
            ...prevValue,
            tag
        }))

        if(tag.trim()) {
            setErrors(prevErrors => ({ ...prevErrors, tag: "" }))
        }
    }

    const validate = () => {
        const newErrors = {}
        if (!description.trim()) newErrors.description = "Description is required"
        if (!tag.trim()) {
            newErrors.tag = "Tag is required"
        } else if (/\s/.test(tag.trim())) {
            newErrors.tag = "Tag must be a single word"
        }
        if (!image) newErrors.image = "Image is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0 
    }

    const handlePublish = () => {
        if (!validate()) return 

        setIsLoading(true)

        const formData = new FormData()
        formData.append('title', blogData.title)
        formData.append('description', blogData.description)
        formData.append('blogContent', blogData.blogContent)
        formData.append('tag', blogData.tag)
        formData.append('image', blogData.image)

        blogService.addBlogPost(formData)
            .then((response) => {
                if (response.status === 201) {
                    window.location.href = '/'
                    toast.success(`${response.data.message}`)
                }
            })
            .catch((error) => {
                if(error.response.status == 401) {
                    removeLocalStorage()
                    navigate('/login')
                    toast.error('Session Expired, Login Again to continue.')
                }
                if(error.response.status == 500) {
                    toast.error(`${error.response.data.message}`)
                } 
                else {
                    toast.error(`${error}`)
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div className="w-full max-w-5xl mx-auto mt-10 p-4">
            <div className="flex justify-end mb-6">
                <button 
                    className="bg-blue-500 text-white py-2 px-6 rounded-full"
                    onClick={handleKeepEditing}
                >
                    Keep edit
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">

                <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-semibold">Header Image</h3>
                    <div 
                        className={`flex items-center justify-center w-full h-80 mt-4 bg-gray-200 rounded-md cursor-pointer ${errors.image ? 'border border-red-500' : ''}`} 
                        onClick={handleImageBoxClick}
                    >
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImage} 
                            accept="image/png, image/jpg, image/jpeg" 
                            className="hidden" 
                        />
                        {image ? (
                            <img src={URL.createObjectURL(image)} className="object-contain w-full h-full" alt="Blog Header" />
                        ) : (
                            <p>Click here to upload image</p>
                        )}
                    </div>
                    {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    <p className="mt-2 text-sm"><span className="font-semibold">Note:</span> Include a high-quality image to make your blog more inviting to readers.</p>
                </div>

                <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-semibold">Description</h3>
                    <textarea
                        className={`w-full mt-4 h-40 bg-gray-200 p-4 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.description ? 'border border-red-500' : ''}`}
                        placeholder="Write the description"
                        value={description}
                        onChange={handleDescription}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    <p className="mt-2 text-sm"><span className="font-semibold">Note:</span> A well-written description can help readers choose your post.</p>

                    <h3 className="text-xl font-semibold mt-12">Description</h3>
                    <input
                        className={`w-full mt-4 mb-1 h-6 bg-gray-200 p-4 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.tag ? 'border border-red-500' : ''}`}
                        placeholder="Tag: Tech"
                        value={tag}
                        onChange={handleTag}
                    />
                    {errors.tag && <p className="text-red-500 text-sm">{errors.tag}</p>}
                    <p className="mt-2 text-sm"><span className="font-semibold">Note:</span> A well-written description can help readers choose your post.</p>
                    
                    <div className="mt-12">
                        <ButtonComponent
                            onClick={isLoading ? null : handlePublish}
                            className={`py-2 px-8 rounded-full 
                                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 cursor-pointer'} 
                                text-white`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Publishing...' : 'Publish Now'}
                        </ButtonComponent>
                        <p className="mt-2 text-sm">
                            <a href="#" className="underline">Learn more</a> about what happens when you publish.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BlogDetailsComponent
