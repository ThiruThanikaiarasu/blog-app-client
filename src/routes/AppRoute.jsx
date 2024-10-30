import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingComponent from '../components/LoadingComponent'
import HeroPage from '../pages/HeroPage'
import ScrollToTop from '../components/ScrollToTop'

const LoginPage = lazy(() => import('../pages/LoginPage'))
const SignupPage = lazy(() => import('../pages/SignupPage'))
const MainLayout = lazy(() => import('../layouts/MainLayout'))
const AuthLayout = lazy(() => import('../layouts/AuthLayout'))
const Homepage = lazy(() => import('../pages/Homepage'))
const BlogPage = lazy(() => import('../pages/BlogPage'))
const BlogWritingComponent = lazy(() => import('../components/BlogWritingComponent'))
const BlogDetailsComponent = lazy(() => import('../components/BlogDetailsComponent'))
const ProfileLayout = lazy(() => import('../layouts/ProfileLayout'))
const UserProfileComponent = lazy(() => import('../components/UserProfileComponent'))
const SignupEmailCapture = lazy(() => import('../pages/SignupComponent/SignupEmailCaptureStep'))
const SignupEmailVerification = lazy(() => import('../pages/SignupComponent/SignupEmailVerification'))
const SignupEmailProfile = lazy(() => import('../pages/SignupComponent/SignupEmailProfile'))

const AppRoute = () => {
    return (
        <Router>
            <ScrollToTop />
            <Suspense fallback={<LoadingComponent />}>
                <Routes>
                    {/* Main Layout Routes */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HeroPage />} />
                        <Route path="/blog" element={<Homepage />} />
                        <Route path="/blog/:slug" element={<BlogPage />} />
                        <Route path="/write" element={<BlogWritingComponent />} />
                        <Route path="/write-details" element={<BlogDetailsComponent />} />
                        <Route element={<ProfileLayout />}>
                            <Route path="/profile" element={<UserProfileComponent />} />
                        </Route>
                    </Route>

                    {/* Auth Layout Routes */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<LoginPage />} />
                        {/* <Route path="/signup" element={<SignupPage />} /> */}
                        <Route path="/signup" element={<SignupEmailCapture />} />
                        <Route path="/signup/email-verification" element={<SignupEmailVerification />} />
                        <Route path="/signup/profile" element={<SignupEmailProfile />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default AppRoute
