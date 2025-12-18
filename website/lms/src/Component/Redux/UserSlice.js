import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    user: null,
    isAuthentication: false,
}

export const userAuthSlice = createSlice({
    name: "User slice",
    initialState,
    reducers: {
        userAuthSuccess: (state, action) => {
            state.user = action.payload.user
            state.isAuthentication = action.payload.isAuthentication
        },
        userLoggedOut: (state, action) => {
            state.user = null
            state.isAuthentication = false
        }
    }
})

export const { userAuthSuccess, userLoggedOut } = userAuthSlice.actions
export default userAuthSlice.reducer
