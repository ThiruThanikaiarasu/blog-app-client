import React, { useState } from 'react'
import CommentSectionComponent from './CommentSectionComponent'
import blogService from '../api/blogService'
import toast from 'react-hot-toast'
import useUserContext from '../hooks/useUserContext'
import removeLocalStorage from '../utils/removeLocalStorage'
import { useNavigate } from 'react-router-dom'

const CommentComponent = ({ slug, commentSectionRef, comments, setComments}) => {

    const navigate = useNavigate()

    const { isUserLoggedIn } = useUserContext()

    const [commentText, setCommentText] = useState('')

    const handleCommentText = (event) => {
        setCommentText(event.target.value)
    }

    const handleCancelComment = () => {
        setCommentText('')
    }

    const handleCommentPost = () => {
        
        blogService.addComment(slug, commentText)
            .then((response) => {
                if(response.status == 201) {
                    location.reload()
                }
            })
            .catch((error) => {
                if(error.response.status == 401) {
                    removeLocalStorage()
                    navigate('/login')
                    toast.error('Session Expired, Login Again to continue.')
                }
                if(error.response.status == 404) {
                    toast.error(`${error.response.data.message}`)
                }
                if(error.response.status == 500) {
                    toast.error(`${error.response.data.message}`)
                }
                else {
                    toast.error(`${error}`)
                }
            })
    }

    const handleComment = () => {
        if (!isUserLoggedIn) {
            toast.error('Please login to share your thoughts', {
                position: "top-center"
            })
            return
        }
        else {
            handleCommentPost()
        }
    }

    return (
        <React.Fragment>
            <div className="mt-10 border-t border-gray-300" ref={commentSectionRef}>
                <h4 className="mt-4 text-xl font-semibold">Comments</h4>
            </div>

            <div className="mt-6 flex flex-col">
                <textarea
                    className="w-full border-b border-black focus:outline-none p-2"
                    rows="1"
                    placeholder="Write your comment"
                    value={commentText}
                    onChange={handleCommentText}
                ></textarea>
                <div className="mt-2 flex justify-end space-x-3">
                    <button 
                        className="px-4 text-sm py-2 border rounded-full font-semibold bg-white hover:bg-gray-300" 
                        onClick={handleCancelComment}>
                        Cancel
                    </button>
                    <button
                        className={`text-sm px-4 py-2 rounded-full text-white ${commentText.length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        onClick={handleComment}
                        disabled={commentText.length === 0}
                    >
                        Comment
                    </button>
                </div>
            </div>

            <div className='mt-8 space-y-6'>
                {comments && comments.map((comment, index) => (
                    <div key={index}>
                        <CommentSectionComponent slug={slug} comment={comment} />
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default CommentComponent