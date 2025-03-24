import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAuthState = createAsyncThunk(
    'auth/fetchAuthState',
    async () => {
        const savedAuthState = localStorage.getItem('authState')
        return savedAuthState
            ? JSON.parse(savedAuthState)
            : { isAuthenticated: false, user: null, role: null }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password, role }, { rejectWithValue }) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const users = [
                { username: 'admin', password: 'admin123', role: 'admin' },
                { username: 'user', password: 'user123', role: 'user' },
            ]

            const user = users.find(
                (u) =>
                    u.username === username &&
                    u.password === password &&
                    u.role === role
            )

            if (user) {
                return { user: { username }, role: user.role }
            } else {
                throw new Error('Invalid username, password, or role')
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
