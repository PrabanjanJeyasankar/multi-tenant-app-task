import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth)

    const storedAuthState = JSON.parse(localStorage.getItem('authState'))
    const userIsAuthenticated =
        isAuthenticated || storedAuthState?.isAuthenticated

    return userIsAuthenticated ? children : <Navigate to='/login' replace />
}

export default ProtectedRoute
