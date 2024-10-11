import React from 'react'
import { Heart } from 'lucide-react'
    
import useUserContext from '../hooks/useUserContext'

const LikeComponent = ({ isUserLiked, likesCount, isLikeLoading, handleLikeClick}) => {

    const { isUserLoggedIn } = useUserContext()

    return (
        <React.Fragment>
            <Heart 
               color= {isUserLiked ? 'red' : 'black'} 
               style={{fill: isUserLiked ? 'red' : ''}}
               onClick={!isLikeLoading ? handleLikeClick : null}
               cursor= 'pointer'
            />
            <span
                className="select-none cursor-pointer"
            >
                {likesCount}
            </span>
        </React.Fragment>
    )
}

export default LikeComponent