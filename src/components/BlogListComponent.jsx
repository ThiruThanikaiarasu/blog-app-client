import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistance } from 'date-fns'

const BlogListComponent = React.memo(({ blog, isUsersPost }) => {
    const navigate = useNavigate()
    const { slug, title, createdAt, image, author } = blog

    const createdAtDate = useMemo(() => createdAt.split('T')[0], [createdAt])
    const timestamp = useMemo(() => new Date(createdAt), [createdAt])
    const now = new Date()
    const timeAgo = useMemo(() => formatDistance(timestamp, now, { addSuffix: true }), [timestamp, now])

    const [hoveredPost, setHoveredPost] = useState(null)

    const handleBlogClick = () => {
        navigate(`/blog/${slug}`, { state: { blogData: blog } })
    }

    return (
        <article 
            key={slug} 
            className="mx-10 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-lg"
            style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}
            onMouseEnter={() => setHoveredPost(slug)}
            onMouseLeave={() => setHoveredPost(null)}
        >
            <div 
                className="flex flex-col sm:flex-row"
                onClick={() => handleBlogClick(slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                    handleBlogClick(slug)
                    }
                }}
            >
                <div className="sm:w-1/6 relative">
                    {/* <div className="aspect-w-4 aspect-h-3 relative"> */}
                    <div className="w-full h-30 aspect-w-4 aspect-h-3 sm:w-full sm:h-full relative border-r border-black border-opacity-10">

                        <img
                            src={image}
                            alt={`Cover for ${title}`}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${hoveredPost === slug ? 'opacity-100' : 'opacity-0'}`}>
                            <span className="text-white font-semibold">Read More</span>
                        </div>
                    </div>
                </div>

                <div className="sm:w-2/3 p-6">
                {isUsersPost 
                    ?
                    <div className="flex items-center mb-4">
                        <div>
                            <p className="text-xs text-gray-500">
                            Published: {timeAgo}
                            </p>
                        </div>
                    </div>
                    :
                        <div className="flex items-center mb-4">
                            <img 
                                src={author.image} 
                                alt={`Author: ${author.firstName}`} 
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <div>
                                <p className="text-sm font-semibold">{author.firstName}</p>
                                <p className="text-xs text-gray-500">
                                {timeAgo}
                                </p>
                            </div>
                        </div>
                }
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">
                    {blog.description}
                    </p>
                </div>
            </div>
        </article>
    )
})

export default BlogListComponent
