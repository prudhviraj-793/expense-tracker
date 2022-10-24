import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {theme: ''}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        darkMode(state) {
            state.theme = 'dark'
        },
        lightMode(state) {
            state.theme = ''
        }
    }
})

export const themeActions = themeSlice.actions

export default themeSlice.reducer