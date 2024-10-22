import {Link, useNavigate} from 'react-router-dom'
import { Bell, PenSquare } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import useUserContext from '../hooks/useUserContext'
import toast from 'react-hot-toast'
import UserProfileDropdownMenu from './UserProfileDropdownMenu'

const NavbarComponent = () => {

    const dropdownRef = useRef(null)  

    const navigate = useNavigate()

    const { isUserLoggedIn, userProfile } = useUserContext()
    const [isOpen, setIsOpen] = useState(false)

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

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

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
            <header className="border-b border-gray-200 bg-white">
                <div className="px-4 sm:px-4 md:px-4 lg:px-4 xl:px-0">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-bold text-red-500">
                            Jotify
                            </Link>
                        </div>
                        
                        <div className="flex items-center space-x-4 ">
                            <button
                                className="flex items-center mr-4"
                                aria-label="Write"
                                onClick={handleWriteClick}
                            >
                                <span
                                    className="rounded-full bg-gray-100 mr-2 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                                >
                                    <PenSquare className="h-5 w-5" />
                                </span>
                                <span 
                                    className="ml-0"
                                >
                                    Write
                                </span>
                            </button>

                            <button 
                                className="rounded-full bg-gray-300 p-1" aria-label="User profile"
                                onClick={handleToggle}
                            >

                                { userProfile.image ? 
                                    <img 
                                        src={userProfile.image} 
                                        alt="Logo"
                                        className="h-7 w-7 max-h-full max-w-full object-cover rounded-full" 
                                    />
                                :
                                    <img 
                                        src={userProfile.image} 
                                        alt="Logo"
                                        className="h-auto w-auto max-h-full max-w-full object-contain rounded-full" 
                                    />
                                }
                                <UserProfileDropdownMenu
                                    isOpen={isOpen} 
                                    dropdownRef={dropdownRef}
                                    onClose={() => setIsOpen(false)}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
    )
}

export default NavbarComponent