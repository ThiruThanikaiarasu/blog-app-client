import { Bookmark, BookmarkPlus } from 'lucide-react'
import React, { useState } from 'react'
import blogService from '../api/blogService'
import toast from 'react-hot-toast'
import useUserContext from '../hooks/useUserContext'
import removeLocalStorage from '../utils/removeLocalStorage'
import { useNavigate } from 'react-router-dom'

const BookMarkComponent = ({ slug, isBookmarked, setIsBookmarked }) => {

    const navigate = useNavigate()

    const { isUserLoggedIn } = useUserContext()

    const [isBookMarkLoading, setIsBookMarkLoading] = useState(false)

    const handleToggleBookmark = () => {
        setIsBookMarkLoading(true)

        const previousBookmarkStatus = isBookmarked
        const newBookmarkStatus = !isBookmarked

        setIsBookmarked(newBookmarkStatus)

        blogService.updateBookmarkStatus(slug, newBookmarkStatus)
            .then((response) => {
                if(response.status == 201) {
                    // setIsBookmarked(true)
                    toast.success(`${response.data.message}`)
                }
                if(response.status == 200) {
                    // setIsBookmarked(false)
                    toast.success(`${response.data.message}`)
                }
            })
            .catch((error) => {
                setIsBookmarked(previousBookmarkStatus)

                if (error.response) {
                    if (error.response.status === 401) {
                        removeLocalStorage()
                        navigate('/login')
                        toast.error('Session Expired, Login Again to continue.')
                    } else if (error.response.status === 400) {
                        toast.error(`${error.response.data.message}`)
                    } else {
                        toast.error(`An error occurred: ${error.response.status}`)
                    }
                } else {
                    toast.error('Network error. Please check your connection and try again.')
                }
            })
            .finally(() => {
                setIsBookMarkLoading(false)
            })

    }

    const handleClick = () => {
        if (!isUserLoggedIn) {
            toast.error('Please login to add bookmark', {
                position: "top-center"
            })
            return
        }
        else {
            setIsBookMarkLoading(true)
            handleToggleBookmark()
        }
    }

    return (
        <React.Fragment>
            {
                isBookmarked 
                    ?
                        <Bookmark
                            onClick={handleClick}
                            fill='black'
                            cursor='pointer'
                        />
                    :
                        <BookmarkPlus
                            onClick={handleClick}
                            cursor='pointer'
                        />
            }
            
        </React.Fragment>
    )
}

export default BookMarkComponent