import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'
import { NotebookPen } from 'lucide-react'
import logo from '../assets/img/defaultProfilePicture.jpg'
import UserProfileDropdownMenu from './UserProfileDropdownMenu'
import toast from 'react-hot-toast'


const NavbarComponent = () => {
    
    const dropdownRef = useRef(null)  

    const navigate = useNavigate()
    
    const { isUserLoggedIn, userProfile } = useUserContext()
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(!isOpen)
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

    const handleWriteClick = () => {
        if (!isUserLoggedIn) {
            toast.error("Please login to write Blog Post.", {
                position: "top-center"
            });
        } else {
            navigate('/write');  
        }
    }

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
                        <div className="text-lg flex items-center cursor-pointer select-none" onClick={handleWriteClick}>
                            <NotebookPen className="mr-2" size={20}/> Write
                        </div>
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
                                { userProfile?.image ? 
                                
                                    <img 
                                        src={userProfile.image} 
                                        alt="Logo"
                                        className="h-7 w-7 max-h-full max-w-full object-cover rounded-full" 
                                    />
                                :
                                <img 
                                    src={logo} 
                                    alt="Logo"
                                    className="h-auto w-auto max-h-full max-w-full object-contain rounded-full" 
                                />
                                    }
                            </div>
                            <UserProfileDropdownMenu 
                                isOpen={isOpen} 
                                dropdownRef={dropdownRef}
                                onClose={() => setIsOpen(false)}
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
