import React, { useState } from 'react'
import ButtonComponent from './ButtonComponent'
import blogService from '../api/blogService'
import toast from 'react-hot-toast'

const ReplyCommentComponent = ({ slug, comment, setIsReplying }) => {

    const [replyText, setReplyText] = useState('')

    const handleReplyText = (event) => {
        setReplyText(event.target.value)
    }

    const handleReplyCancelSubmit = () => {
        setReplyText('')
        setIsReplying(false)
    }

    const handleReplySubmit = () => {
        setReplyText('')
        setIsReplying(false)
        blogService.addReplyComment(slug, comment._id, replyText)
            .then((response) => {
                if (response.status === 201) {
                    location.reload()
                }
            })
            .catch((error) => {
                if(error.response.status == 500) {
                    toast.error(`${error.response.data.message}`)
                }
                else {
                    toast.error(`${error}`)
                }
            })
    }

    return (
        <div className="mt-2">
            <div className="flex flex-col">

                <textarea 
                    rows="1" 
                    className="text-sm w-full border-b border-black focus:outline-none p-1 mt-2" 
                    value={replyText} 
                    onChange={handleReplyText} 
                    placeholder='Write reply comment' 
                />

                <div className="flex justify-end mt-2">

                <ButtonComponent 
                    className="px-4 mr-3 text-sm py-2 border rounded-full font-semibold bg-white hover:bg-gray-300" 
                    onClick={handleReplyCancelSubmit}>
                    Cancel
                </ButtonComponent>

                <ButtonComponent
                    className={`text-sm px-4 py-2 rounded-full text-white ${replyText.length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    onClick={handleReplySubmit}
                    disabled={replyText.length === 0}
                >
                    Reply
                </ButtonComponent>
                    
                </div>
            </div>
        </div>
    )
}

export default ReplyCommentComponent