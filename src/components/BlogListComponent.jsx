import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistance } from 'date-fns'

const BlogListComponent = React.memo(({ blog }) => {
    const navigate = useNavigate()
    const { slug, title, createdAt, image, author } = blog

    const createdAtDate = useMemo(() => createdAt.split('T')[0], [createdAt])
    const timestamp = useMemo(() => new Date(createdAt), [createdAt])
    const now = new Date()
    const timeAgo = useMemo(() => formatDistance(timestamp, now, { addSuffix: true }), [timestamp, now])

    const handleBlogClick = () => {
        navigate(`/blog/${slug}`, { state: { blogData: blog } })
    }

    return (
        <div
            className="flex flex-col md:flex-row md:items-start gap-6 p-4 border-b border-gray-200 cursor-pointer transition hover:bg-gray-100"
            onClick={handleBlogClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleBlogClick()
                }
            }}
        >
            <div className="w-40 max-h-42">
                <img 
                    src={image} 
                    alt={`Image for ${title}`} 
                    className="rounded-xl w-full h-full object-cover shadow-md hover:shadow-lg transition"
                    loading="lazy"
                />
            </div>
            
            <div className="md:w-3/4 w-full">
                <div className="flex items-center gap-4 mb-2">
                    <img 
                        src={author.image} 
                        alt={`Author: ${author.firstName}`} 
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="text-sm font-semibold">{author.firstName}</p>
                        <p className="text-xs text-gray-500">{timeAgo}</p>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {title}
                </h3>
            </div>
        </div>
    )
})

export default BlogListComponent
