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
        // <div className="flex justify-center items-center cursor-pointer" onClick={handleBlogClick}>
        // <div className=" w-full pb-6 flex flex-col md:flex-row border-b-2 last:border-b-0 mx-4 xl:mx-0 lg:mx-4 md:mx-6">
        //     <div className="w-full md:w-[27%] xl:w-[28%] max-h-44">
        //     <img 
        //         src={image}
        //         alt={`Cover for ${title}`}
        //         className="w-full h-full object-cover rounded-md"
        //     />
        //     </div>

        //     <div className="mt-4 md:mt-0 lg:mt-2 xl:mt-2 md:ml-4 pl-2 xl:pl-0 lg:pl-0 md:pl-2 sm:pl-2 flex-1">
        //     {isUsersPost ? (
        //         <div className="flex items-center mb-3">
        //         <div className="flex font-medium items-center pt-2">
        //             <p className="font-medium">Published: </p>
        //             <p className="text-sm text-gray-500 ml-1">{timeAgo}</p>
        //         </div>
        //         </div>
        //     ) : (
        //         <div className="flex items-center mb-3">
        //         <img 
        //             src={author.image} 
        //             alt={`Author: ${author.firstName}`} 
        //             className="w-5 h-5 object-cover rounded-full mr-2"
        //         />
        //         <div>
        //             <p className="text-sm font-medium text-gray-600">{author.firstName}</p>
        //         </div>
        //         </div>
        //     )}
            
        //     <h2 className="text-xl md:text-[1.8rem] font-semibold tracking-normal text-gray-900 my-3 p-1line-clamp-2 capitalize">
        //         {title}
        //     </h2>
        //     <p className="text-gray-600 line-clamp-2 md:line-clamp-3">
        //         {description}
        //     </p>

        //     <div className="flex items-center mt-4">
        //         <p className="text-sm font-bold text-red-500 mr-2">{tag}</p>
        //         {!isUsersPost && (
        //         <>
        //             <span>•</span>
        //             <p className="text-xs mt-[2px] ml-2 text-gray-500">{timeAgo}</p>
        //         </>
        //         )}
        //     </div>
        //     </div>
        // </div>
        // </div>
        <div className="flex justify-center items-center cursor-pointer" onClick={handleBlogClick}>
            <div className="w-full pb-6 flex flex-col lg:flex-row border-b-2 last:border-b-0 mx-4 xl:mx-0 lg:mx-4 md:mx-6">
                <div className="w-full lg:w-[27%] xl:w-[28%] h-44 lg:h-auto">
                    <img 
                        src={image}
                        alt={`Cover for ${title}`}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-4 flex-1">
                    {isUsersPost ? (
                        <div className="flex items-center mb-3">
                            <div className="flex font-medium items-center">
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
                
                    <h2 className="text-xl lg:text-[1.8rem] font-semibold tracking-normal text-gray-900 my-3 line-clamp-2 capitalize">
                        {title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2 lg:line-clamp-3">
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