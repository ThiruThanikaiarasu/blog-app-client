import React, { useEffect } from 'react'
import authService from '../api/authService'
import useUserContext from '../hooks/useUserContext'
import { useNavigate } from 'react-router-dom'

const GoogleAccountVerification = () => {

    const navigate = useNavigate()

    const { setIsUserLoggedIn, setUserProfile } = useUserContext()

    useEffect(() => {
        authService.getUserDataFromGoogle()
            .then((response) => {
                if(response.status == 200) {
                    setIsUserLoggedIn(true)
                    setUserProfile(response.data.data)
                    localStorage.setItem(
                        'userProfile',
                        JSON.stringify(response.data.data)
                    )
                    localStorage.setItem('isUserLoggedIn', 'true')

                    navigate('/')
                    toast.success(`Logged in successfully`)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default GoogleAccountVerification