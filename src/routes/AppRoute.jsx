import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import Homepage from '../pages/Homepage'
import BlogPage from '../pages/BlogPage'
import BlogWritingComponent from '../components/BlogWritingComponent'
import BlogDetailsComponent from '../components/BlogDetailsComponent'


const AppRoute = () => {
    return (
        <Router>
            <Routes>
                {/* Main Layout Routes */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/blog/:slug" element={<BlogPage />} />
                    <Route path="/write" element={<BlogWritingComponent />} />
                    <Route path="/write-details" element={<BlogDetailsComponent />} />
                </Route>

                {/* Auth Layout Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoute
