import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../app/feature/authentication/authenticationThunks'
import LoginForm from '../components/LoginComponents/LoginForm'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, isAuthenticated, role } = useSelector(
        (state) => state.auth
    )
    const { config } = useSelector((state) => state.tenant)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, role, navigate])

    if (!config) return <div>Loading tenant configuration...</div>

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(loginUser({ email, password }))
    }

    return (
        <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 '>
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
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
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
