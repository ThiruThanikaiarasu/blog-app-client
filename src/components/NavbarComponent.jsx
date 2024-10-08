import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { BsPencilSquare } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiAccountBoxLine } from "react-icons/ri";
import { TbChecklist } from "react-icons/tb";



const NavbarComponent = () => {

    const {isLoggedIn, setIsLoggedIn } = useState(false)

    const handleSignout = () => {

    }
    return (
        <nav className="w-full bg-gray-800 text-white flex justify-between p-4">
            <div className="flex items-center">
                <Link className="text-xl" to="/">Home</Link>
            </div>
            <div className="flex items-center">
                <ul className="flex space-x-4">
                    <li>
                        <Link className="text-lg flex items-center" to="/write">
                            <BsPencilSquare className="mr-1" /> Write
                        </Link>
                    </li>
                    {isLoggedIn ? (
                        <li className="relative">
                            <div className="text-lg flex items-center cursor-pointer">
                                <MdOutlineAccountCircle className="text-2xl mr-1" /> Account
                            </div>
                            
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