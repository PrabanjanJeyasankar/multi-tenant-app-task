import { createSlice } from '@reduxjs/toolkit'
import { fetchTenantConfig } from './tenantThunks'

const initialState = {
    config: null,
    loading: false,
    error: null,
}

const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        resetTenantConfig: (state) => {
            state.config = null
            state.error = null
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTenantConfig.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTenantConfig.fulfilled, (state, action) => {
                state.config = action.payload
                state.loading = false
            })
            .addCase(fetchTenantConfig.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { resetTenantConfig } = tenantSlice.actions
export default tenantSlice.reducer
