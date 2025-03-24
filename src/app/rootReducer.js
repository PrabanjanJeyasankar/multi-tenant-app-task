import { combineReducers } from '@reduxjs/toolkit'
import authenticationReducer from '../app/feature/authentication/authenticationSlice'
import tenantReducer from '../app/feature/tenant/tenantSlice'

const rootReducer = combineReducers({
    auth: authenticationReducer,
    tenant: tenantReducer,
})

export default rootReducer
