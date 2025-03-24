import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { fetchTenantConfig } from './app/feature/tenant/tenantThunks'
import ProtectedRoute from './components/protectedRoute'
import SideNavLayout from './Layouts/SideNavLayout'
import TopNavLayout from './Layouts/TopNavLayout'
import LoginPage from './pages/LoginPage'

const App = () => {
    const dispatch = useDispatch()
    const { config, loading, error } = useSelector((state) => state.tenant)

    useEffect(() => {
        dispatch(fetchTenantConfig())
    }, [dispatch])

    const Layout = useMemo(
        () => (config?.layout === 'side-nav' ? SideNavLayout : TopNavLayout),
        [config]
    )

    if (loading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                Loading tenant configuration...
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                    Error loading tenant configuration: {error}
                </div>
            </div>
        )
    }

    if (!config) {
        return (
            <div className='flex h-screen items-center justify-center'>
                No tenant configuration found
            </div>
        )
    }

    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route
                path='/'
                element={
                    <ProtectedRoute>
                        <Layout>
                            <div>Dashboard</div>
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path='/admin'
                element={
                    <ProtectedRoute>
                        <Layout>
                            <div>Admin</div>
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default App
