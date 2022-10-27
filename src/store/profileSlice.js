import { createSlice } from "@reduxjs/toolkit";

const initialProfileState = {displayName: '', photoUrl: ''}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialProfileState,
    reducers: {
        updateProfile(state, action) {
            state.displayName = action.payload.displayName
            state.photoUrl = action.payload.photoUrl
        }
    }
})

export const profileActions = profileSlice.actions

export default profileSlice.reducer