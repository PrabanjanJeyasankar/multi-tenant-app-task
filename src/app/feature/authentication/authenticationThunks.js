import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../../public/config/firebaseConfig'

import userData from '../../../data/userData'

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user

            const matchedUser = userData.find(
                (userItem) => userItem.email === user.email
            )

            const role = matchedUser ? matchedUser.role : 'user'

            return { user: { email: user.email }, role }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
