import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from './authenticationThunks'

const initialState = {
    isAuthenticated: false,
    user: null,
    role: null,
    loading: false,
    error: null,
}

const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            state.role = null
            state.loading = false
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.user = action.payload.user
                state.role = action.payload.role
                state.loading = false
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false
                state.user = null
                state.role = null
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { logout } = authenticationSlice.actions
export default authenticationSlice.reducer
