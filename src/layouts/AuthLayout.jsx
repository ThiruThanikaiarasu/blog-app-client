import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../components/NavbarComponent'

const AuthLayout = () => {
    return (
        <React.Fragment>
            <NavbarComponent />
            <div className="mt-20">
                <Outlet />
            </div>
        </React.Fragment>
    )
}

export default AuthLayout
