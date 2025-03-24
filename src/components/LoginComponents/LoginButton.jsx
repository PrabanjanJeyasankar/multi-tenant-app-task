function LoginButton({ loading, primaryColor }) {
    return (
        <button
            type='submit'
            disabled={loading}
            style={{ backgroundColor: primaryColor }}
            className='group mt-2 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2'>
            {loading ? 'Signing in...' : 'Sign in'}
        </button>
    )
}

export default LoginButton
