import { Bookmark, BookmarkPlus } from 'lucide-react'
import React, { useState } from 'react'
import blogService from '../api/blogService'

const BookMarkComponent = ({ slug, isBookmarked, setIsBookmarked }) => {

    const [isBookMarkLoading, setIsBookMarkLoading] = useState(false)

    const handleToggleBookmark = () => {
        setIsBookMarkLoading(true)

        const newBookmarkStatus = !isBookmarked

        blogService.updateBookmarkStatus(slug, newBookmarkStatus)
            .then((response) => {
                if(response.status == 201) {
                    setIsBookmarked(true)
                }
                if(response.status == 200) {
                    setIsBookmarked(false)
                }
            })
            .catch((error) => {
                console.log(error.response)
                if(error.response.status == 400) {
                    alert(error.response.data.message)
                }
                if(error.response.status == 500) {
                    console.log('Something went wrong try again later')
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