import React, { createContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const storedUserProfile = localStorage.getItem('userProfile')
    const storedIsLoggedIn = localStorage.getItem('isUserLoggedIn')

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(storedIsLoggedIn === 'true')
    const [userProfile, setUserProfile] = useState(
        storedUserProfile ? JSON.parse(storedUserProfile) : null
    )

    return (
        <UserContext.Provider
            value={{ isUserLoggedIn, userProfile, setIsUserLoggedIn, setUserProfile }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }