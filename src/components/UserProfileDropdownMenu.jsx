import { LogOut, Newspaper, User } from 'lucide-react'
import React from 'react'
import useUserContext from '../hooks/useUserContext'
import authService from '../api/authService'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const UserProfileDropdownMenu = ({ isOpen, dropdownRef, onClose }) => {

    const { setIsUserLoggedIn, setUserProfile } = useUserContext()
    const navigate = useNavigate()

    if (!isOpen) return null


    const handleSignOut = () => {
        authService.logout()
            .then((response) => {
                if (response.status === 200) {
                    setIsUserLoggedIn(false)
                    setUserProfile(null)
                    localStorage.removeItem('isUserLoggedIn')
                    localStorage.removeItem('userProfile')
                    navigate('/')
                    toast.success('Logged out Successfully')                    
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
    }

    const handleProfileClick = () => {
        onClose()
    }

    return (
        <div ref={dropdownRef} className="relative z-[100]">
            <div className="absolute top-2 left-[-160px] w-48 p-2 bg-white shadow-lg border rounded-lg text-black">
                <ul>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleProfileClick}>
                        <Link to="/profile">
                            <div className="flex items-center">
                                <User size={18} className="mr-3" />
                                <span>Profile</span>
                            </div>
                        </Link>
                    </li>

                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center">
                            <Newspaper size={18} className="mr-3" />
                            <span>My Posts</span>
                        </div>
                    </li>

                    <li 
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleSignOut}
                    >
                        <div className="flex items-center">
                            <LogOut size={18} className="mr-3" />
                            <span>Log out</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserProfileDropdownMenu
