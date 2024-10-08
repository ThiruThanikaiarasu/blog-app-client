import React, { createContext, useState, useEffect, useMemo } from 'react'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [userProfile, setUserProfile] = useState(null)

    useEffect(() => {
        const storedIsUserLoggedIn = localStorage.getItem('isUserLoggedIn')
        const storedUserProfile = localStorage.getItem('userProfile')

        if (storedIsUserLoggedIn === 'true') {
            setIsUserLoggedIn(true)
        }

        if (storedUserProfile) {
            setUserProfile(JSON.parse(storedUserProfile))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('isUserLoggedIn', isUserLoggedIn)
    }, [isUserLoggedIn])

    useEffect(() => {
        if (userProfile) {
            localStorage.setItem('userProfile', JSON.stringify(userProfile))
        } else {
            localStorage.removeItem('userProfile')
        }
    }, [userProfile])

    const values = useMemo(() => ({
        isUserLoggedIn,
        setIsUserLoggedIn,
        userProfile,
        setUserProfile,
    }), [isUserLoggedIn, userProfile])

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
