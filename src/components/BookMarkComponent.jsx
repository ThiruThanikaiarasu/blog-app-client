import { Bookmark, BookmarkPlus } from 'lucide-react'
import React, { useState } from 'react'
import blogService from '../api/blogService'
import toast from 'react-hot-toast'

const BookMarkComponent = ({ slug, isBookmarked, setIsBookmarked }) => {

    const [isBookMarkLoading, setIsBookMarkLoading] = useState(false)

    const handleToggleBookmark = () => {
        setIsBookMarkLoading(true)

        const newBookmarkStatus = !isBookmarked

        blogService.updateBookmarkStatus(slug, newBookmarkStatus)
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
                console.log(error.response)
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

    return (
        <React.Fragment>
            {
                isBookmarked 
                    ?
                        <Bookmark
                            onClick={!isBookMarkLoading ? handleToggleBookmark : null}
                            fill='black'
                            cursor='pointer'
                        />
                    :
                        <BookmarkPlus
                            onClick={!isBookMarkLoading ? handleToggleBookmark : null}
                            cursor='pointer'
                        />
            }
            
        </React.Fragment>
    )
}

export default BookMarkComponent