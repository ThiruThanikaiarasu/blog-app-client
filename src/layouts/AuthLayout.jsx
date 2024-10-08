import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <React.Fragment>
            <div className="">
                <Outlet />
            </div>
        </React.Fragment>
    )
}

export default AuthLayout
