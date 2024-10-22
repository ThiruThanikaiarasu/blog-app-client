import { formatDistance } from 'date-fns'
import { Clock } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeroBlogCardComponent = ({blog}) => {

    const navigate = useNavigate()

    const timeStamp = new Date(blog.createdAt)
    const timeAgo = formatDistance(timeStamp, new Date(), {addSuffix: true})

    const handleBlogClick = () => {
        navigate(`/blog/${blog.slug}`, { state: { blogData: blog } })
    }

    return (
        <div 
            className="overflow-hidden rounded-xl bg-white  cursor-pointer"
            onClick={handleBlogClick}
        >
            <img
                src={blog.image}
                alt={blog.title}
                width={200}
                height={200}
                className="h-48 w-full rounded-xl object-cover"
            />
            <div className="p-4">

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                    <div className="h-5 w-5 rounded-full mr-1">
                        <img
                            src={blog.author.image}
                            alt={`Author Profile`}
                            width={20}
                            height={20}
                            className="h-5 rounded-full w-full object-cover " 
                        /> 
                    </div>
                    <span className="font-medium">{blog.author.firstName}</span>
                    </div>
                    <span className="hidden xl:inline lg:hidden md:hidden sm:hidden">•</span>
                    <span className="hidden xl:inline lg:hidden md:hidden sm:hidden">{timeAgo}</span>
                </div>

                <h3 className="mt-2 text-lg font-semibold leading-tight text-gray-900">
                    {blog.title}
                </h3>

                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="font-medium text-red-600">{blog.tag}</span>
                    <div className="flex items-center space-x-1">
                    {/* <Clock className="h-4 w-4" /> */}
                    <span>•</span>
                    <span className="pl-3">5 min read</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBlogCardComponent