import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectIsAuthenticated } from '../app/feature/authentication/authenticationSelectors'

const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const storedAuthState = JSON.parse(localStorage.getItem('authState'))

    const userIsAuthenticated =
        isAuthenticated || storedAuthState?.isAuthenticated

    return userIsAuthenticated ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoute
