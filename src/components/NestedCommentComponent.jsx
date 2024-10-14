import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'
import ButtonComponent from './ButtonComponent'
import blogService from '../api/blogService'
import removeLocalStorage from '../utils/removeLocalStorage'
import { useNavigate } from 'react-router-dom'

const NestedCommentComponent = ({ slug, comment, isShowingReplyComments, setIsShowingReplyComments, replyComments, setReplyComments }) => {

    const navigate = useNavigate()

    const handleShowReplyCommentSubmit = () => {
        setIsShowingReplyComments(!isShowingReplyComments)

        if(!isShowingReplyComments) {
            blogService.fetchReplyComments( slug, comment._id)
                .then((response) => {
                    setReplyComments(response.data)
                    
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
        }
    }

    return (
        <div>
            {comment.numberOfReplies > 0 && 
                <ButtonComponent 
                    className='text-sm flex items-center text-blue-600 py-1 px-2 rounded-md cursor-pointer hover:bg-[#e5e5e5]' 
                    onClick={handleShowReplyCommentSubmit}
                >  
                    {
                        isShowingReplyComments 
                            ? 
                                <ChevronUp 
                                    size={18} 
                                    className="mr-1" 
                                /> 
                            : 
                                <ChevronDown 
                                    size={18} 
                                    className="mr-1" 
                                />
                    }  

                    {
                        comment.numberOfReplies === 1 
                            ? 
                                `${comment.numberOfReplies} reply` 
                            : 
                                `${comment.numberOfReplies} replies`
                    }
                </ButtonComponent>
            }
        </div>
    )
}

export default NestedCommentComponent