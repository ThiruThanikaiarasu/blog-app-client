import React from 'react'

import './App.css'
import AppRoute from './routes/AppRoute'
import { UserProvider } from './context/UserContext'
import { BlogProvider } from './context/BlogContext'
import { Toaster } from 'react-hot-toast'


const App = () => {
    return (
        <React.Fragment>
            <UserProvider>
                <BlogProvider>
                    <AppRoute />
                </BlogProvider>
            </UserProvider>
            <Toaster 
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    // Global options
                    success: {
                        duration: 3000,
                        style: {
                            border: '1px solid green',
                        },
                    },
                    error: {
                        duration: 3000,
                        style: {
                            border: 'red',
                        },
                    },
                }}
            />
        </React.Fragment>
    )
}

export default App