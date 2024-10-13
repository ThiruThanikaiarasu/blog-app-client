import { useEffect, useMemo, useState } from "react"
import useUserContext from "../hooks/useUserContext"
import blogService from "../api/blogService"
import toast from "react-hot-toast"
import BlogListComponent from './BlogListComponent'
import LoadingComponent from './LoadingComponent'

export default function UserProfileComponent() {

    const { userProfile, userImageBasePath, userPosts, setUserPosts, userBookmarkedPosts, setUserBookmarkedPosts } = useUserContext()

    const [isLoading, setIsLoading] = useState(false)

    const imagePath = userImageBasePath + userProfile.image
    const [activeTab, setActiveTab] = useState("posts")

    const user = {
        bio: "Passionate blogger | Tech enthusiast | Coffee lover",
    }

    useEffect(() => {
        setIsLoading(true)
        blogService.fetchUserPostsAndBookmarks()
            .then((response) => {
                if(response.status == 200) {
                    setUserPosts(response.data.userPosts)
                    setUserBookmarkedPosts(response.data.userBookmarks)
                    console.log(response.data.userBookmarks)
                }
            })
            .catch((error) => {
                if(error.response.status == 500) {
                    toast.error(`${error.response.data.message}`)
                }
                else {
                    toast.error(`${error}`)
                }
            })
            .finally(()=> {
                setIsLoading(false)
            })
    }, [])

    const memoizedUserPosts = useMemo(() => {
        return userPosts.map((post) => (
            <div key={post.slug} className="my-2">
                <BlogListComponent blog={post} isUsersPost={true} />
            </div>
        ))
    }, [userPosts])

    const memoizedUserBookmarkedPosts = useMemo(() => {
        return userBookmarkedPosts.map((post) => (
            <div key={post.slug} className="my-2">
                <BlogListComponent blog={post.blog} />
            </div>
        ))
    }, [userBookmarkedPosts])

    if(isLoading) {
        return <LoadingComponent />
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col items-center sm:flex-row sm:items-start">
                <img
                    src={imagePath}
                    alt={`${userProfile}'s Profile picture`}
                    className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-6"
                />
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold">{userProfile.firstName}</h1>
                    <p className="text-gray-600">{userProfile.email}</p>
                    <p className="mt-2 max-w-md">{user.bio}</p>
                </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex border-b border-gray-200">
                <button
                    className={`py-2 px-4 font-medium ${
                    activeTab === "posts"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("posts")}
                >
                    Posts
                </button>
                <button
                    className={`py-2 px-4 font-medium ${
                    activeTab === "saved"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("saved")}
                >
                    Saved
                </button>
                </div>
            </div>

            {activeTab === "posts" && (
                memoizedUserPosts
            )}

            {activeTab === "saved" && (
                memoizedUserBookmarkedPosts
            )}
        </div>
    )
}