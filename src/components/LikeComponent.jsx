import React from 'react'
import { Heart } from 'lucide-react'
    
import useUserContext from '../hooks/useUserContext'
import toast from 'react-hot-toast'

const LikeComponent = ({ isUserLiked, likesCount, isLikeLoading, handleLikeClick}) => {

    const { isUserLoggedIn } = useUserContext()

    const handleClick = () => {
        if (!isUserLoggedIn) {
            toast.error('Please login to like the post', {
                position: "top-center"
            })
            return
        }
        if (!isLikeLoading) {
            handleLikeClick()
        }
    }

    return (
        <React.Fragment>
            <Heart 
               color= {isUserLiked ? 'red' : 'black'} 
               style={{fill: isUserLiked ? 'red' : ''}}
               onClick={handleClick}
               cursor= 'pointer'
               title={!isUserLoggedIn ? 'Login to like the post' : ''}
            />
            <span
                className="select-none cursor-pointer w-4"
            >
                {likesCount}
            </span>
        </React.Fragment>
    )
}

export default LikeComponent