const FirebaseAuthErrorMessage = (errorCode) => {
    const errorMessages = {
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/network-request-failed': 'Network error. Check your connection.',
    }

    return errorMessages[errorCode] || 'Something went wrong. Please try again.'
}

export default FirebaseAuthErrorMessage