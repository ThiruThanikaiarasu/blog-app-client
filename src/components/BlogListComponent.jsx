// import React, { useMemo, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { formatDistance } from 'date-fns'

// const BlogListComponent = React.memo(({ blog, isUsersPost }) => {
//     const navigate = useNavigate()
//     const { slug, title, createdAt, image, author } = blog

//     const createdAtDate = useMemo(() => createdAt.split('T')[0], [createdAt])
//     const timestamp = useMemo(() => new Date(createdAt), [createdAt])
//     const now = new Date()
//     const timeAgo = useMemo(() => {
//         const distance = formatDistance(timestamp, now, { addSuffix: true })
//         return distance.replace('about ', '')
//     }, [timestamp, now])

//     const [hoveredPost, setHoveredPost] = useState(null)

//     const handleBlogClick = () => {
//         navigate(`/blog/${slug}`, { state: { blogData: blog } })
//     }

//     return (
//         <div
//             className="flex justify-center items-center cursor-pointer"
//             onClick={handleBlogClick}
//         >
//             <div
//                 className='max-w-[1024px] w-full pb-4 flex border-b-2'
//             >
//                         <img 
//                             src={image}
//                             alt={`Cover for ${title}`}
//                             className='w-[25%] h-[10rem] rounded-md'
//                         />

//                     <div className="ml-4 mt-1">
//                         {isUsersPost 
//                             ?
//                             <div className="flex items-center mb-3">
//                                 <div className="flex font-medium items-center">
//                                     <p>Published: </p>
//                                     <p className="text-sm text-gray-500 ml-1">
//                                      {timeAgo}
//                                     </p>
//                                 </div>
//                             </div>
//                             :
//                                 <div className="flex items-center mb-3">
//                                     <img 
//                                         src={author.image} 
//                                         alt={`Author: ${author.firstName}`} 
//                                         className="w-5 h-5 object-cover rounded-full mr-2"
//                                     />
//                                     <div>
//                                         <p className="text-sm font-medium text-gray-600">{author.firstName}</p>
//                                     </div>
//                                 </div>
//                         }
                    
//                         <h2 
//                             className="text-2xl font-extrabold text-gray-900 mb-2 line-clamp-2 capitalize"
//                         >
//                             {title}
//                         </h2>
//                         <p 
//                             className="text-gray-600 line-clamp-3"
//                         >
//                             {blog.description}
//                         </p>

//                         <div className="flex items-center mt-4">
//                             <p
//                                 className="text-red-500 mr-2"
//                             >
//                                 {blog.tag}
//                             </p>
//                             { !isUsersPost &&
//                                 <React.Fragment>
//                                 <span>•</span>

//                                 <p className="text-xs mt-[2px] ml-2 text-gray-500">
//                                     {timeAgo}
//                                 </p>
//                                 </React.Fragment>
//                             }
//                         </div>
//                 </div>
//             </div>
//         </div>
//     )
// })

// export default BlogListComponent

import React, { useMemo } from 'react'
import { formatDistance } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const BlogListComponent = React.memo(({ blog, isUsersPost }) => {

    const navigate = useNavigate()

    const { slug, title, createdAt, image, author, description, tag } = blog

    const timestamp = useMemo(() => new Date(createdAt), [createdAt])
    const now = new Date()
    const timeAgo = useMemo(() => {
        const distance = formatDistance(timestamp, now, { addSuffix: true })
        return distance.replace('about ', '')
    }, [timestamp, now])

    const handleBlogClick = () => {
        navigate(`/blog/${slug}`, { state: { blogData: blog } })
    }

    return (
        <div className="flex justify-center items-center cursor-pointer" onClick={handleBlogClick}>
        <div className=" w-full pb-6 flex flex-col md:flex-row border-b-2 last:border-b-0 mx-4 xl:mx-0 lg:mx-4 md:mx-6">
            <div className="w-full md:w-[27%] xl:w-[28%] h-48 md:h-auto">
            <img 
                src={image}
                alt={`Cover for ${title}`}
                className="w-full h-full object-cover rounded-md"
            />
            </div>

            <div className="mt-4 md:mt-0 md:ml-4 pl-2 xl:pl-0 lg:pl-0 md:pl-2 sm:pl-2 flex-1">
            {isUsersPost ? (
                <div className="flex items-center mb-3">
                <div className="flex font-medium items-center pt-2">
                    <p className="font-medium">Published: </p>
                    <p className="text-sm text-gray-500 ml-1">{timeAgo}</p>
                </div>
                </div>
            ) : (
                <div className="flex items-center mb-3">
                <img 
                    src={author.image} 
                    alt={`Author: ${author.firstName}`} 
                    className="w-5 h-5 object-cover rounded-full mr-2"
                />
                <div>
                    <p className="text-sm font-medium text-gray-600">{author.firstName}</p>
                </div>
                </div>
            )}
            
            <h2 className="text-xl md:text-[1.8rem] font-semibold tracking-normal text-gray-900 my-3 p-1line-clamp-2 capitalize">
                {title}
            </h2>
            <p className="text-gray-600 line-clamp-2 md:line-clamp-3">
                {description}
            </p>

            <div className="flex items-center mt-4">
                <p className="text-sm font-bold text-red-500 mr-2">{tag}</p>
                {!isUsersPost && (
                <>
                    <span>•</span>
                    <p className="text-xs mt-[2px] ml-2 text-gray-500">{timeAgo}</p>
                </>
                )}
            </div>
            </div>
        </div>
        </div>
    )
})

export default BlogListComponent