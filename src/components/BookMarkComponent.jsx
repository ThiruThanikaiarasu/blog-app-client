import { Bookmark, BookmarkPlus } from 'lucide-react'
import React, { useState } from 'react'
import blogService from '../api/blogService'
import toast from 'react-hot-toast'
import useUserContext from '../hooks/useUserContext'

const BookMarkComponent = ({ slug, isBookmarked, setIsBookmarked }) => {

    const { isUserLoggedIn } = useUserContext()

    const [isBookMarkLoading, setIsBookMarkLoading] = useState(false)

    const handleToggleBookmark = () => {
        setIsBookMarkLoading(true)

        const newBookmarkStatus = !isBookmarked

        blogService.updateBookmarkStatus(slug, newBookmarkStatus)
            setIsBookMarkLoading(true)
            .then((response) => {
                if(response.status == 201) {
                    setIsBookmarked(true)
                    toast.success(`${response.data.message}`)
                }
                if(response.status == 200) {
                    setIsBookmarked(false)
                    toast.success(`${response.data.message}`)
                }
            })
            .catch((error) => {
                if(error.response.status == 400) {
                    toast.error(`${error.response.data.message}`)
                }
                if(error.response.status == 500) {
                    toast.error(`${error.response.data.message}`)
                }
                else {
                    toast.error(`${error}`)
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