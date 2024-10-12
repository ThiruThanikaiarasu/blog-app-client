import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { MessageCircle, Share2 } from 'lucide-react'
import LikeComponent from '../components/LikeComponent'
import axios from 'axios'
import blogService from '../api/blogService'
import BookMarkComponent from '../components/BookMarkComponent'
import CommentComponent from '../components/CommentComponent'

const BlogPage = () => {

    const location = useLocation()
    const blogData = location.state?.blogData 

    const { slug } = useParams()

    const [ isUserLiked, setIsUserLiked ] = useState(false)
    const [ likesCount, setLikesCount ] = useState(0) 
    const [isLikeLoading, setIsLikeLoading] = useState(false)

    const [isBookmarked, setIsBookmarked] = useState(false)

    const [comments, setComments] = useState([])

    const commentSectionRef = useRef(null)

    const createdAt = (blogData.createdAt).split('T')[0]

    useEffect(() => {
        axios
            blogService.fetchBlogDetails(slug)
            .then((response) => {
                if(response.status == 200) {
                    console.log(response.data.likeDetails[0])
                    setIsUserLiked(response.data.likeDetails[0].isUserLiked)
                    setLikesCount(response.data.likeDetails[0].likesCount)
                    setIsBookmarked(response.data.likeDetails[0].userBookmarked)
                    setComments(response.data.likeDetails[0].comments)
                }
            })
            .catch((error) => {
                if(error.response.status == 500) {
                    toast.error(`${error.response.data.message}`)
                }
                toast.error(`${error}`)
            })
    }, [slug])

    const handleLikeClick = () => {
        setIsLikeLoading(true)
        const newLikedStatus = !isUserLiked
        
        blogService.updateLikeStatus(slug, newLikedStatus)
            .then((response) => {
                if(response.status == 201) {
                    setIsUserLiked(true)
                    setLikesCount(prev => prev + 1)
                }
                if(response.status == 200) {
                    setIsUserLiked(false)
                    setLikesCount(prev => prev - 1)
                }
            })
            .catch((error) => {
                console.log(error.response)
                if(error.response.status == 400) {
                    toast.error(`${error.response.data.message}`)
                }
                if(error.response.status == 500) {
                    toast.error(`${error.response.data.message}`)
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

    return (
        <div
            className="flex justify-center"
        >
            <div className='flex flex-col items-center max-w-4xl w-full px-4 sm:px-6 lg:px-8'>
                <div className="w-full mt-12">
                    
                    <div className="">
                        <h1 className="text-3xl font-bold">{blogData.title}</h1>
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
                        <div className="flex space-x-6">

                            <BookMarkComponent 
                                slug={slug}
                                isBookmarked={isBookmarked}
                                setIsBookmarked={setIsBookmarked}
                            />
   
                            <Share2 />
                        </div>
                    </div>

                    
                    <div className="mt-10 flex justify-center">
                        <img src={blogData.image} className="max-w-4xl lg:max-w-4xl object-contain" />
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
            </div>
        </div>

    )
}

export default BlogPage
