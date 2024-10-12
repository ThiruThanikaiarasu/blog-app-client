import React from 'react'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    )
}

export default ProfileLayout