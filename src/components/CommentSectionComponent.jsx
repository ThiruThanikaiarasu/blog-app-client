import React, { useEffect, useRef, useState } from 'react'
import { Ellipsis, Reply } from 'lucide-react'
import ReplyCommentComponent from './ReplyCommentInputComponent'
import CommentOptionsMenu from './CommentOptionsMenu'
import NestedCommentComponent from './NestedCommentComponent'
import blogService from '../api/blogService'
import toast from 'react-hot-toast'
import removeLocalStorage from '../utils/removeLocalStorage'
import { useNavigate } from 'react-router-dom'

const CommentSectionComponent = ({ slug, comment }) => {

    const navigate = useNavigate()

    const [replyText, setReplyText] = useState('')
    const [isReplying, setIsReplying] = useState(false)
    const [isEditingComment, setIsEditingComment] = useState(false)
    const [replyComments, setReplyComments] = useState([])

    const [commentOptionsDropdownVisible, setCommentOptionsDropdownVisible] = useState(false)
    const dropdownRef = useRef(null)

    const [isShowingReplyComments, setIsShowingReplyComments] = useState(false)

    const toggleDropdown = () => {
        setCommentOptionsDropdownVisible(!commentOptionsDropdownVisible)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setCommentOptionsDropdownVisible(false) 
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleCommentReplyClick = () => {
        setIsReplying(!isReplying)
    }

    const handleCommentEditCancel = () => {
        setReplyText('')
        setIsEditingComment(false)
    }

    const handleCommentEditSave = () => {
        blogService.editComment(slug, replyText, comment._id)
            .then((response) => {
                if(response.status == 200) {
                    setIsEditingComment(false)
                    comment.text = replyText
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

    const handleReplyText = (event) => {
        setReplyText(event.target.value)
    }

    return (
        <div className="mb-4">
            <div className="flex mb-4 pb-2">

                <div className="w-12 h-12 rounded-full mr-2">
                    <img src={comment.author.image} alt="Profile" className="object-cover w-full h-full rounded-full" />
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-sm mb-1">{comment.author.firstName}</p>
                            <p className="text-gray-800">{comment.text}</p>
                        </div>
                        <div className="relative" ref={dropdownRef}>
                            <button className="rounded p-1" type="button" onClick={toggleDropdown}>
                                <Ellipsis className="text-black" />
                            </button>
                            {commentOptionsDropdownVisible && (
                                <CommentOptionsMenu 
                                    slug={slug}
                                    comment={comment} 
                                    isEditingComment={isEditingComment}
                                    setIsEditingComment={setIsEditingComment}
                                    setReplyText={setReplyText}
                                    setCommentOptionsDropdownVisible={setCommentOptionsDropdownVisible}
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center mt-2 ml-2">
                        <div onClick={handleCommentReplyClick} className="ml-1 py-1 px-2 rounded-md cursor-pointer flex hover:bg-[#e5e5e5]">
                            <Reply size={18}/> 
                            <span
                                className='text-sm ml-2'
                            >
                                Reply
                            </span>
                        </div>
                        <NestedCommentComponent 
                            slug={slug} 
                            comment={comment} 
                            isShowingReplyComments={isShowingReplyComments}
                            setIsShowingReplyComments={setIsShowingReplyComments}
                            replyComment={replyComments}
                            setReplyComments={setReplyComments}
                        />
                    </div>

                    {isReplying && (
                        <ReplyCommentComponent 
                            slug={slug} 
                            comment={comment} 
                            setIsReplying={setIsReplying}
                            setReplyComments={setReplyComments}
                        />
                    )}

                    {isEditingComment && (
                        <div className="mt-2">
                            <div className="flex flex-col">
                                <textarea rows="1" className="border border-gray-300 rounded p-2 mt-2 w-full" value={replyText} onChange={handleReplyText} placeholder='Edit comment' />
                                <div className="flex justify-end mt-2">
                                    <button className={`bg-blue-600 text-white rounded px-4 py-1 mr-2 ${replyText.length === 0 || replyText == comment.text ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleCommentEditSave} disabled={replyText.length === 0 || comment.text == replyText}>Save</button>
                                    <button className="bg-gray-200 rounded px-4 py-1" onClick={handleCommentEditCancel}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}

                    
                </div>
            </div>

            {isShowingReplyComments && replyComments.map((replyComment, index) => (
                <div key={index} className="ml-8">
                    <CommentSectionComponent comment={replyComment} />
                </div>
            ))}
        </div>
    )
}

export default CommentSectionComponent

