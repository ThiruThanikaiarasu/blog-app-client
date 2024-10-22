import { createContext, useState } from "react";

const BlogContext = createContext({})

export const BlogProvider = ({ children }) => {

    const [homeMainFeed, setHomeMainFeed] = useState()
    const [homeFeed, setHomeFeed] = useState([])
    const [ blogPost, setBlogPost] = useState([])
    const [authorData, setAuthorData] = useState({})
    const [blogData, setBlogData] = useState({
        title: "",
        description: "",
        blogContent: "",
        image: null,
        tag: ""
    })

    return (
        <BlogContext.Provider
            value={{
                homeMainFeed,
                setHomeMainFeed,
                homeFeed,
                setHomeFeed,
                blogPost,
                setBlogPost,
                authorData,
                setAuthorData,
                blogData,
                setBlogData
            }}
        >
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContext