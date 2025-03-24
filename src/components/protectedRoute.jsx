import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {
    selectIsAuthenticated,
    selectRole,
} from '../app/feature/authentication/authenticationSelectors'

const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const role = useSelector(selectRole)

    const location = useLocation()

    const storedAuthState = JSON.parse(localStorage.getItem('authState'))
    const userIsAuthenticated =
        isAuthenticated || storedAuthState?.isAuthenticated

    if (!userIsAuthenticated) {
        return <Navigate to='/login' replace />
    }

    if (location.pathname.includes('admin') && role !== 'admin') {
        return <Navigate to='/' replace />
    }

    return <Outlet />
}

export default ProtectedRoute
