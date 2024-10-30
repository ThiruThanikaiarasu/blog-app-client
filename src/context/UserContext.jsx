import React, { createContext, useEffect, useState } from 'react'


const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [signupFormData, setSignupFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const storedUserProfile = localStorage.getItem('userProfile')
    const storedIsLoggedIn = localStorage.getItem('isUserLoggedIn')

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(storedIsLoggedIn === 'true')
    const [userProfile, setUserProfile] = useState(
        storedUserProfile ? JSON.parse(storedUserProfile) : null
    )

    const [userPosts, setUserPosts] = useState([])
    const [userBookmarkedPosts, setUserBookmarkedPosts] = useState([])

    useEffect(() => {
        if (userProfile) {
            localStorage.setItem('userProfile', JSON.stringify(userProfile))
        }
        localStorage.setItem('isUserLoggedIn', isUserLoggedIn)
    }, [userProfile, isUserLoggedIn])

    const value = {
        isUserLoggedIn, userProfile, setIsUserLoggedIn, setUserProfile, signupFormData, setSignupFormData, userPosts, setUserPosts, userBookmarkedPosts, setUserBookmarkedPosts
    }

    return (
        <UserContext.Provider
            value={ value }>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }