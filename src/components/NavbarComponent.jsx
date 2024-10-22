import {Link, useLocation, useNavigate} from 'react-router-dom'
import { Bell, PenSquare } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import useUserContext from '../hooks/useUserContext'
import toast from 'react-hot-toast'
import UserProfileDropdownMenu from './UserProfileDropdownMenu'

const NavbarComponent = () => {

    const dropdownRef = useRef(null)  

    const navigate = useNavigate()

    const location = useLocation()

    const linkToDestination = location.pathname === '/blog' ? '/' : '/blog'

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

    const handleLoginClick = () => {
        navigate('/login')
    }

    return (
            <header className="fixed flex justify-center top-0 left-0 w-full z-50 border-b border-gray-200 bg-white">
                <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-4 md:px-4 lg:px-4 xl:px-0">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link to={linkToDestination} className="text-3xl xl:text-2xl lg:text-2xl md:text-3xl sm:text-3xl font-bold text-red-500">
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
                                    className="rounded-full bg-gray-100 mr-0 xl:mr-2 lg:mr-2 md:mr-2 sm:mr-0 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                                >
                                    <PenSquare className="h-6 w-6 xl:h-5 xl:w-5 lg:h-5 lg:w-5 md:h-6 md:w-6 sm:w-6 sm:h-6" />
                                </span>
                                <span 
                                    className="ml-0 hidden xl:inline lg:inline md:hidden sm:hidden"
                                >
                                    Write
                                </span>
                            </button>

                            

                                {userProfile?.image ? 
                                <div>
                                    <button 
                                        className="rounded-full bg-gray-300 p-1" aria-label="User profile"
                                        onClick={handleToggle}
                                    >
                                        <img 
                                            src={userProfile.image} 
                                            alt="Logo"
                                            className="h-8 w-8 xl:h-7 xl:w-7 lg:h-7 lg:w-7 md:h-8 md:w-8 sm:w-8 sm:h-8 max-h-full max-w-full object-cover rounded-full" 
                                        />
                                    </button>
                                    <UserProfileDropdownMenu
                                    isOpen={isOpen} 
                                    dropdownRef={dropdownRef}
                                    onClose={() => setIsOpen(false)}
                                    
                                />
                                </div>
                                :
                                    <p 
                                        className="cursor-pointer py-2" 
                                        onClick={handleLoginClick}
                                    >
                                        Login
                                    </p>
                                }
                                
                        </div>
                    </div>
                </div>
            </header>
    )
}

export default NavbarComponent