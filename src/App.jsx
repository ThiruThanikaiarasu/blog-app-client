import React from 'react'

import './App.css'
import AppRoute from './routes/AppRoute'
import { UserProvider } from './context/UserContext'
import { BlogProvider } from './context/BlogContext'


const App = () => {
    return (
        <UserProvider>
            <BlogProvider>
                <AppRoute />
            </BlogProvider>
        </UserProvider>
    )
}

export default App