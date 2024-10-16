import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Link, MessageCircle, Share2 } from 'lucide-react'
import LikeComponent from '../components/LikeComponent'
import blogService from '../api/blogService'
import BookMarkComponent from '../components/BookMarkComponent'
import CommentComponent from '../components/CommentComponent'
import toast from 'react-hot-toast'
import removeLocalStorage from '../utils/removeLocalStorage'
import LoadingComponent from '../components/LoadingComponent'

const BlogPage = () => {

    const navigate = useNavigate()

    const location = useLocation()

    const { slug } = useParams()

    const [blogData, setBlogData] = useState(location.state?.blogData || null)
    const [ isUserLiked, setIsUserLiked ] = useState(false)
    const [ likesCount, setLikesCount ] = useState(0) 
    const [isPageLoading, setIsPageLoading] = useState(false)

    const [isLikeLoading, setIsLikeLoading] = useState(false)

    const [isBookmarked, setIsBookmarked] = useState(false)

    const [comments, setComments] = useState([])

    const commentSectionRef = useRef(null)

    
    useEffect(() => {
        setIsPageLoading(true)
        if(!blogData) {
            blogService.fetchBlogDetailsBySlug(slug)
                .then((response) => {
                    if(response.status == 200) {
                        const data = response.data
                        setBlogData({
                            title: data.title,
                            description: data.description,
                            content: data.content,
                            createdAt: data.createdAt,
                            image: data.image,
                            author: {
                                firstName: data.author.firstName,
                                image: data.author.image
                            },
                        })
                        setIsUserLiked(data.isUserLiked)
                        setLikesCount(data.likesCount)
                        setIsBookmarked(data.userBookmarked)
                        setComments(data.comments)
                    }
                })
                .catch((error) => {
                    if(error.response) {
                        if(error.response.status == 404) {
                            navigate('/')
                            toast.error(`${error.response.data.message}`)
                        }
                        if(error.response.status == 500) {
                            toast.error(`${error.response.data.message}`)
                        }
                    }
                    else {
                        navigate('/')
                        toast.error('Network error. Please check your connection and try again.')
                    }
                })
                .finally(() => {
                    setIsPageLoading(false)
                })
        } else {
            blogService.fetchBlogDetails(slug)
            .then((response) => {
                if(response.status == 200) {
                    setIsUserLiked(response.data.likeDetails[0].isUserLiked)
                    setLikesCount(response.data.likeDetails[0].likesCount)
                    setIsBookmarked(response.data.likeDetails[0].userBookmarked)
                    setComments(response.data.likeDetails[0].comments)
                }
            })
            .catch((error) => {
                if(error.response) {
                    if(error.response.status == 401) {
                        removeLocalStorage()
                        navigate('/login')
                        toast.error('Session Expired, Login Again to continue.')
                    }
                    if(error.response.status == 404) {
                        navigate('/')
                        toast.error(`${error.response.data.message}`)
                    }
                    if(error.response.status == 500) {
                        toast.error(`${error.response.data.message}`)
                    }
                }
                else {
                    toast.error('Network error. Please check your connection and try again.')
                }
            })
            .finally(()=> {
                setIsPageLoading(false)
            })
        }
    }, [slug, blogData])
    
    const createdAt = (blogData?.createdAt)?.split('T')[0]
    
    const handleLikeClick = () => {
        setIsLikeLoading(true)
        const previousLikedStatus = isUserLiked
        const previousLikesCount = likesCount
        const newLikedStatus = !isUserLiked

        setIsUserLiked(newLikedStatus)
        setLikesCount(prev => newLikedStatus ? prev + 1 : prev - 1)

        
        blogService.updateLikeStatus(slug, newLikedStatus)
            .then((response) => {
                if(response.status == 201) {
                    // setIsUserLiked(true)
                    // setLikesCount(prev => prev + 1)
                }
                if(response.status == 200) {
                    // setIsUserLiked(false)
                    // setLikesCount(prev => prev - 1)
                }
            })
            .catch((error) => {
                setIsUserLiked(previousLikedStatus)
                setLikesCount(previousLikesCount)

                if (error.response) {
                    if (error.response.status === 401) {
                        removeLocalStorage()
                        navigate('/login')
                        toast.error('Session Expired, Login Again to continue.')
                    } else if (error.response.status === 400 || error.response.status === 500) {
                        toast.error(`${error.response.data.message}`)
                    }
                } else {
                    toast.error('Network error. Please check your connection and try again.')
                }
            })
            .finally(() => {
                setIsLikeLoading(false)
            })
    }

    const handleScrollToComments = () => {
        window.scrollTo({
            top: commentSectionRef.current.offsetTop ,
            behavior: "smooth"
          })
    }

    const handleShareClick = () => {
        const currentUrl = window.location.href
        navigator.clipboard.writeText(currentUrl)
        .then(() => {
            toast.success('URL copied to clipboard!')
        })
        .catch((err) => {
            toast.error('Failed to copy URL!', {
                position: 'top-center',
            })
            toast.error('Error copying URL:', err)
        })
    }

    if(isPageLoading) {
        return <LoadingComponent />
    }

    return (
        <div
            className="flex justify-center"
        >
            <div className='flex flex-col items-center max-w-4xl w-full px-4 sm:px-6 lg:px-8'>
                { blogData && 
                    <div className="w-full mt-12">
                        
                        <div className="">
                            <h1 className="text-3xl font-bold capitalize">{blogData.title}</h1>
                            <h5 className="text-gray-500 mt-2 text-lg">{blogData.description}</h5>
                        </div>

                        
                        <div className="mt-10 flex items-center">
                            <div className="h-16 w-16">
                                <img src={blogData.author.image} alt="" className="h-full w-full rounded-full" />
                            </div>
                            <div className="ml-3">
                                <h5 className="text-lg font-semibold">{blogData.author.firstName} {blogData.author.lastName}</h5>
                                <h5 className="text-gray-500 text-sm">Published on: {createdAt}</h5>
                            </div>
                        </div>

                        
                        <div className="mt-8 flex justify-between border-t border-b border-gray-300 py-4">
                            <div className="flex space-x-6">
                                <div className="flex items-center space-x-2">
                                    <LikeComponent 
                                        isUserLiked={isUserLiked}
                                        likesCount={likesCount}
                                        isLikeLoading={isLikeLoading}
                                        handleLikeClick={handleLikeClick}
                                    />
                                </div>
                                <div className="flex items-center space-x-2 cursor-pointer" onClick={handleScrollToComments}>
                                    
                                    <MessageCircle />
                                    <span className="">
                                        {comments.length}
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-6" title="Add Bookmark">

                                <BookMarkComponent 
                                    slug={slug}
                                    isBookmarked={isBookmarked}
                                    setIsBookmarked={setIsBookmarked}
                                    title="Add Bookmark"
                                />

                                <div onClick={handleShareClick} className="cursor-pointer" title='Copy Link'>
                                    <Link size={22} title="Copy Link"/>
                                </div>
                            </div>
                        </div>

                        
                        <div className="mt-10 flex justify-center">
                            <img src={blogData.image} className="max-w-full w-full h-auto object-contain lg:max-w-4xl" />
                        </div>

                        
                        <div className="mt-10">
                            <div className="content" dangerouslySetInnerHTML={{ __html: blogData.blogContent }}></div>
                        </div>

                        <CommentComponent 
                            slug={slug}
                            comments={comments}
                            setComments={setComments}
                            commentSectionRef={commentSectionRef}
                        />
                    </div>
                }
            </div>
        </div>

    )
}

export default BlogPage
