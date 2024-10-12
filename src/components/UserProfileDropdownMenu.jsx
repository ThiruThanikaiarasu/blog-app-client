import { LogOut, Newspaper, User } from 'lucide-react'
import React from 'react'
import useUserContext from '../hooks/useUserContext'
import authService from '../api/authService'
import { Link } from 'react-router-dom'

const UserProfileDropdownMenu = ({ isOpen, dropdownRef }) => {
    if (!isOpen) return null

    const { setIsUserLoggedIn, setUserProfile } = useUserContext()

    const handleSignOut = () => {
        authService.logout()
            .then((response) => {
                if (response.status === 200) {
                    setIsUserLoggedIn(false)
                    setUserProfile(null)
                    localStorage.removeItem('isUserLoggedIn')
                    localStorage.removeItem('userProfile')
                    alert('Successfully Logged out')
                    location.reload()
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div ref={dropdownRef} className="relative z-[100]">
            <div className="absolute top-9 left-[-175px] w-48 p-2 bg-white shadow-lg border rounded-lg text-black">
                <ul>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
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
