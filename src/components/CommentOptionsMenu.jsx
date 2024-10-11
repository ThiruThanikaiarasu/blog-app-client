import { Flag, Pencil, Trash } from 'lucide-react'
import React from 'react'

const CommentOptionsMenu = ({ slug, comment, isEditingComment, setReplyText, setIsEditingComment, setCommentOptionsDropdownVisible }) => {

    const handleEditCommentClick = () => {
        setIsEditingComment(true)
        setCommentOptionsDropdownVisible(false)
        setReplyText(comment.text)
    }

    const handleDeleteCommentClick = () => {
        
    }

    const handleReportCommentClick = () => {

    }

    return (
        <ul className="dropdown-menu absolute right-0 z-10 bg-white shadow-lg rounded mt-1 mb-10">
            {comment?.isUserComment && comment.isUserComment ? (
                <div 
                    className="flex flex-col w-full bg-white rounded-lg"
                    style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}
                >
                    <li>
                        <button 
                            type="button" 
                            className="flex items-center w-full py-1 px-3 hover:bg-[#e5e5e5] mt-2"
                            onClick={handleEditCommentClick}
                        >
                            <Pencil size={18} />
                            <span className="ml-2">Edit</span>
                        </button>
                    </li>
                    <li>
                        <button 
                            type="button" 
                            className="flex items-center w-full py-1 px-3 hover:bg-[#e5e5e5] mb-2"
                            onClick={handleDeleteCommentClick}
                        >
                            <Trash size={18} />
                            <span className="ml-2">Delete</span>
                        </button>
                    </li>
                </div>

            ) : (
                <div 
                    className="flex flex-col w-full bg-white rounded-lg"
                    style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}
                >
                    <li>
                        <button 
                            type="button" 
                            className="flex items-center w-full py-1 px-3 hover:bg-[#e5e5e5] my-2"
                            onClick={handleReportCommentClick}
                        >
                            <Flag size={18} />
                            <span className="ml-2">Report</span>
                        </button>
                    </li>
                </div>
            )}
        </ul>
    )
}

export default CommentOptionsMenu