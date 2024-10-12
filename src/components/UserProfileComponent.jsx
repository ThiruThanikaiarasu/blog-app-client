import { useState } from "react"
import { BookmarkIcon, MessageSquareIcon, ThumbsUpIcon, UserIcon } from "lucide-react"
import useUserContext from "../hooks/useUserContext"

export default function UserProfileComponent() {

    const { userProfile, userImageBasePath } = useUserContext()

    const imagePath = userImageBasePath + userProfile.image
    console.log(imagePath)
    const [activeTab, setActiveTab] = useState("posts")

    const user = {
        name: "Jane Doe",
        username: "@janedoe",
        bio: "Passionate blogger | Tech enthusiast | Coffee lover",
        avatar: "/placeholder.svg?height=100&width=100",
    }

    const posts = [
        { id: 1, title: "10 Tips for Better Productivity", likes: 24, comments: 5 },
        { id: 2, title: "The Future of AI in Everyday Life", likes: 32, comments: 8 },
        { id: 3, title: "How to Start a Successful Blog", likes: 18, comments: 3 },
    ]

    const savedCollections = [
        { id: 1, title: "Must-Read Tech Articles", itemCount: 15 },
        { id: 2, title: "Favorite Recipes", itemCount: 8 },
        { id: 3, title: "Travel Inspiration", itemCount: 12 },
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col items-center sm:flex-row sm:items-start">
                <img
                    src={imagePath}
                    alt={user.name}
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
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                    <div className="flex justify-between text-gray-600">
                        <span className="flex items-center">
                        <ThumbsUpIcon className="mr-1 h-4 w-4" /> {post.likes} likes
                        </span>
                        <span className="flex items-center">
                        <MessageSquareIcon className="mr-1 h-4 w-4" /> {post.comments} comments
                        </span>
                    </div>
                    </div>
                ))}
                </div>
            )}

            {activeTab === "saved" && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {savedCollections.map((collection) => (
                    <div key={collection.id} className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-2">{collection.title}</h2>
                    <p className="text-gray-600 mb-4">{collection.itemCount} items</p>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                        <BookmarkIcon className="mr-2 h-4 w-4" /> View Collection
                    </button>
                    </div>
                ))}
                </div>
            )}
        </div>
    )
}