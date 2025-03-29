import { AtSign, Fingerprint } from 'lucide-react'
import { useState } from 'react'
import {
    validateEmail,
    validatePassword,
} from '../../utils/loginFieldValidations'
import InputField from '../InputField'
import LoginButton from './LoginButton'

function LoginForm({
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    primaryColor,
    handleSubmit,
}) {
    const [errors, setErrors] = useState({})
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleFormSubmit = (event) => {
        event.preventDefault()
        setFormSubmitted(true)

        const emailError = validateEmail(email)
        const passwordError = validatePassword(password)

        setErrors({ email: emailError, password: passwordError })

        if (emailError || passwordError) return

        handleSubmit(event)
    }

    const handleEmailChange = (val) => {
        setEmail(val)
        if (formSubmitted) {
            setErrors((prev) => ({
                ...prev,
                email: validateEmail(val),
            }))
        }
    }

    const handlePasswordChange = (val) => {
        setPassword(val)
        if (formSubmitted) {
            setErrors((prev) => ({
                ...prev,
                password: validatePassword(val),
            }))
        }
    }

    const clearEmailError = () => {
        setErrors((prev) => ({ ...prev, email: '' }))
    }

    const clearPasswordError = () => {
        setErrors((prev) => ({ ...prev, password: '' }))
    }

    return (
        <form className='mt-12' onSubmit={handleFormSubmit} noValidate>
            <div className='rounded-md'>
                <InputField
                    id='email'
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={clearEmailError}
                    autoComplete='email'
                    icon={<AtSign size={18} />}
                    error={errors.email}
                />
                <InputField
                    id='password'
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={clearPasswordError}
                    autoComplete='current-password'
                    icon={<Fingerprint size={18} />}
                    error={errors.password}
                />
            </div>

            <LoginButton loading={loading} primaryColor={primaryColor} />
            {error && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2.5 rounded mt-4'>
                    {error}
                </div>
            )}
        </form>
    )
}

export default LoginForm
