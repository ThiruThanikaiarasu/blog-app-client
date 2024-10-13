import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const storedUserProfile = localStorage.getItem('userProfile')
    const storedIsLoggedIn = localStorage.getItem('isUserLoggedIn')

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(storedIsLoggedIn === 'true')
    const [userProfile, setUserProfile] = useState(
        storedUserProfile ? JSON.parse(storedUserProfile) : null
    )

    const [userPosts, setUserPosts] = useState([])
    const [userBookmarkedPosts, setUserBookmarkedPosts] = useState([])

    return (
        <UserContext.Provider
            value={{ isUserLoggedIn, userProfile, setIsUserLoggedIn, setUserProfile, userPosts, setUserPosts, userBookmarkedPosts, setUserBookmarkedPosts }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }