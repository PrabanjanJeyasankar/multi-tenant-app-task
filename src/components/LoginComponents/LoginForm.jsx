import InputField from '../InputFields'
import LoginButton from './LoginButton'
import SelectField from './SelectField'

function LoginForm({
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    loading,
    error,
    primaryColor,
    handleSubmit,
}) {
    return (
        <form className='mt-12' onSubmit={handleSubmit}>
            <div className='rounded-md'>
                <InputField
                    id='username'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={setUsername}
                    autoComplete='username'
                />
                <InputField
                    id='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={setPassword}
                    autoComplete='current-password'
                />
                <SelectField value={role} onChange={setRole} />
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
