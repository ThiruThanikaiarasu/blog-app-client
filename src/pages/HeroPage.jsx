import { ArrowRight, Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useBlogContext from '../hooks/useBlogContext'
import blogService from '../api/blogService'
import HeroBlogCardComponent from '../components/HeroBlogCardComponent'
import { formatDistance } from 'date-fns'

const HeroPage = () => {

    const navigate = useNavigate()

    const {homeMainFeed, setHomeMainFeed, homeFeed, setHomeFeed} = useBlogContext()

    const timeStamp = homeMainFeed?.createdAt ? new Date(homeMainFeed.createdAt) : null;
    console.log(timeStamp)
    const timeAgo = formatDistance(timeStamp, new Date(), {addSuffix: true})

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        blogService.fetchHomeFeed()
            .then((response) => {
                const data = response.data.data
                const [mainFeed, ...remainingFeed] = data  
                setHomeMainFeed(mainFeed)  
                setHomeFeed(remainingFeed) 
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleBlogClick = () => {
        navigate(`/blog/${homeMainFeed.slug}`, { state: { blogData: homeMainFeed } })
    }

    return (
        <React.Fragment>
            <div className="text-center my-9 p-0 flex justify-center items-center ">

                <div className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
                    <div className="mx-auto max-w-[1400px] sm:px-6 lg:px-8">
                        <p 
                        className="text-red-500 font-extrabold uppercase tracking-tight leading-[0.0005rem] xl:leading-[5rem] lg:leading-[5rem] md:leading-[3rem] sm:leading-[1rem]"
                        style={{
                            fontSize: 'clamp(2rem, 18vw, 19rem)',
                            whiteSpace: 'nowrap',
                        }}
                        >
                        THE BLOG
                        </p>
                    </div>
                </div> 
            </div>

            <div className="bg-gray-200 py-8 rounded-md mx-4 sm:mx-4 md:mx-4 lg:mx-4 xl:mx-0">
                <div className="container mx-auto text-center">
                    <h2 className="text-sm font-medium text-gray-500 mb-4">WELCOME TO JOTIFY</h2>
                    <div className="w-full flex justify-center">
                        <p className="text-xl text-center font-semibold text-gray-900 w-[80%] lg:w-[40%] md:w-[55%] sm[60%]">
                            Craft narratives <span className="text-black">✍️</span> that ignite 
                            <span className="text-red-500"> inspiration 💡</span>,
                            <span className="text-red-500"> knowledge 📚</span>, and 
                            <span className="text-red-500"> entertainment 🎬</span>
                        </p>
                    </div>

                </div>
            </div>
            
            
            <div className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
                {loading ? (
                    <div className="w-full flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row px-4 sm:px-4 md:px-4 lg:px-4 xl:px-0">
                        <div className="w-[100%] sm:w-[100%] md:w-[94%] lg:w-[94%] xl:w-[94%] rounded-xl bg-gray-300 animate-pulse h-72"></div>
                        <div className="w-full px-4 xl:px-4 lg:px-4 sm:px-6 md:px-8 pt-8 xl:pt-4 lg:pt-4 sm:pt-8 md:pt-8 py-1">
                            <div className="w-32 h-6 bg-gray-300 animate-pulse rounded-md mb-2"></div>
                            <div className="w-full h-[40px] sm:h-[40px] md:h-[50px] lg:h-[70px] xl:h-[70px] bg-gray-300 animate-pulse rounded-md mb-2 "></div>
                            <div className="w-3/4 h-8 bg-gray-300 animate-pulse rounded-md mb-4"></div>
                            <div className="w-1/2 h-6 bg-gray-300 animate-pulse rounded-md"></div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row px-4 sm:px-4 md:px-4 lg:px-4 xl:px-0 cursor-pointer" onClick={handleBlogClick}>
                        <img
                            className='w-full sm:w-full md:w-[48%] lg:w-[48%] xl:w-[48%] rounded-xl'
                            src={homeMainFeed.image}
                            alt={homeMainFeed.title}
                        />
                        <div className="px-6 xl:px-8 lg:px-8 sm:px-6 md:px-8 pt-8 xl:pt-4 lg:pt-4 sm:pt-8 md:pt-8 py-1">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <div className="hidden xl:inline lg:inline md:inline sm:inline">
                                    <div className="flex items-center space-x-1">
                                        <div className="h-8 w-8 rounded-full mr-1">
                                            <img
                                                src={homeMainFeed.author.image}
                                                alt={`Author Profile`}
                                                className="h-8 rounded-full w-full object-cover" 
                                            />
                                        </div>
                                        <span className="font-medium text-lg">{homeMainFeed.author.firstName}</span>
                                    </div>
                                </div>
                                <span className="hidden xl:inline lg:inline md:hidden sm:inline">•</span>
                                <span className="text-lg hidden xl:inline lg:inline md:hidden sm:inline">{timeAgo}</span>
                            </div>

                            <h2 className="mt-0 xl:mt-6 lg:mt-6 md:mt-6 sm:mt-6 font-semibold text-gray-900 text-2xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl leading-[2.5rem] xl:leading-[3.5rem] lg:leading-[3.5rem] md:leading-[3rem] sm:leading-[2.5rem]">
                                {homeMainFeed.title}
                            </h2>
                            <p className="mt-6 font-medium text-gray-600 leading-normal text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl">
                                {homeMainFeed.description}
                            </p>
                            <div className="mt-6 flex items-center space-x-4 text-gray-500 text-md sm:text-md md:text-lg lg:text-lg xl:text-lg">
                                <span className="font-medium text-red-600">{homeMainFeed.tag}</span>
                                <div className="flex items-center space-x-1">
                                    <span>•</span>
                                    <span className="pl-3">4 min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-6 px-4 sm:px-4 md:px-4 lg:px-4 xl:px-0 mt-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold text-gray-900">Latest News</h2>
                        <div className="hidden xl:inline lg:inline md:hidden sm:hidden">
                            <Link to="/blog" className="flex items-center text-red-600 hover:text-red-700">
                            See all
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {homeFeed && homeFeed.map((blog, index) => (
                            <HeroBlogCardComponent blog={blog} key={index} />
                        ))}
                    </div>
                    </div>
                    <div className="inline xl:hidden lg:hidden md:inline sm:inline">
                        <Link to="/blog" className="flex justify-center items-center mt-8 text-red-600 hover:text-red-700">
                        See more
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
            </div>
        </React.Fragment>
    )
}

export default HeroPage