import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTenantConfig } from './tenantAPI'

export const fetchTenantConfig = createAsyncThunk(
    'tenant/fetchConfig',
    async (_, { rejectWithValue }) => {
        try {
            const config = await getTenantConfig()
            if (!config) {
                throw new Error('Tenant configuration not found.')
            }
            return config
        } catch (error) {
            return rejectWithValue(
                error.message || 'Error fetching tenant config.'
            )
        }
    }
)
