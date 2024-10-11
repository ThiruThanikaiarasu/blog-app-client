import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'
import { NotebookPen } from 'lucide-react'
import logo from '../assets/img/defaultProfilePicture.jpg'
import UserProfileDropdownMenu from './UserProfileDropdownMenu'

const NavbarComponent = () => {
    const { isUserLoggedIn } = useUserContext()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)  

    const handleToggle = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <nav className="w-full bg-gray-800 text-white flex justify-between p-4">
            <div className="flex items-center">
                <Link className="text-xl" to="/">Home</Link>
            </div>
            <div className="flex items-center">
                <ul className="flex space-x-4">
                    <li
                        className="mr-4"
                    >
                        <Link className="text-lg flex items-center" to="/write">
                            <NotebookPen className="mr-2" size={20}/> Write
                        </Link>
                    </li>
                    {isUserLoggedIn ? (
                        <li className="relative">
                            <div 
                                className="text-lg flex items-center cursor-pointer h-7 w-7 mr-6"
                                onClick={handleToggle}
                                aria-expanded={isOpen}
                                aria-haspopup="true"
                                role="button"
                                tabIndex="0"
                                onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
                            >
                                <img 
                                    src={logo} 
                                    alt="Logo"
                                    className="h-auto w-auto max-h-full max-w-full object-contain rounded-full" 
                                />
                            </div>
                            <UserProfileDropdownMenu 
                                isOpen={isOpen} 
                                dropdownRef={dropdownRef}
                            />
                        </li>
                    ) : (
                        <li>
                            <Link className="text-lg" to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default NavbarComponent
