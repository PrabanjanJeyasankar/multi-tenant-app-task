import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { fetchTenantConfig } from './app/feature/tenant/tenantThunks'
import ProtectedRoute from './components/ProtectedRoute'
import NavigationLayout from './Layouts/NavigationLayout'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

const App = () => {
    const dispatch = useDispatch()
    const config = useSelector((state) => state.tenant.config)
    const loading = useSelector((state) => state.tenant.loading)
    const error = useSelector((state) => state.tenant.error)

    useEffect(() => {
        console.log('Fetching tenant config...')
        dispatch(fetchTenantConfig())
    }, [dispatch])

    if (loading)
        return (
            <div className='flex h-screen items-center justify-center'>
                Loading...
            </div>
        )
    if (error)
        return (
            <div className='flex h-screen items-center justify-center text-red-600'>
                Error: {error}
            </div>
        )
    if (!config)
        return (
            <div className='flex h-screen items-center justify-center'>
                No tenant configuration found
            </div>
        )

    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
                <Route path='/' element={<NavigationLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='about' element={<AboutPage />} />
                    <Route path='contact' element={<ContactPage />} />
                </Route>
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default App
