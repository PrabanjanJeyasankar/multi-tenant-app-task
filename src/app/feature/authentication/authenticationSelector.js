export const selectAuth = (state) => state.auth
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectUser = (state) => state.auth.user
export const selectRole = (state) => state.auth.role
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error
