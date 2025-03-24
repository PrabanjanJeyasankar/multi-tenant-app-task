import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../app/feature/authentication/authenticationThunks'
import LoginForm from '../components/LoginComponents/LoginForm'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        loading,
        error,
        isAuthenticated,
        role: userRole,
    } = useSelector((state) => state.auth)
    const { config } = useSelector((state) => state.tenant)

    useEffect(() => {
        if (isAuthenticated) {
            // Redirect based on user role
            if (userRole === 'admin') {
                navigate('/admin-dashboard')
            } else {
                navigate('/user-dashboard')
            }
        }
    }, [isAuthenticated, userRole, navigate])

    if (!config) return <div>Loading tenant configuration...</div>

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({ username, password, role }))
    }

    return (
        <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-Inter'>
            <div className='max-w-md w-full space-y-12 p-10 rounded-lg'>
                <div className='text-center'>
                    <img
                        className='mx-auto h-16 w-auto'
                        src={config.logo}
                        alt={config.name}
                    />
                    <h2 className='mt-6 text-4xl tracking-tight font-extrabold text-gray-900'>
                        Sign in to {config.name}
                    </h2>
                </div>
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    role={role}
                    setRole={setRole}
                    loading={loading}
                    error={error}
                    primaryColor={config.theme.primary}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default LoginPage
