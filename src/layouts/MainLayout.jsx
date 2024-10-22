import React from 'react'
import { Outlet } from 'react-router-dom'

import NavbarComponent from '../components/NavbarComponent'


const MainLayout = () => {
    return (
        <React.Fragment>
            <NavbarComponent />
            <div className="mt-16">
                <Outlet />
            </div>
        </React.Fragment>
    )
}

export default MainLayout
