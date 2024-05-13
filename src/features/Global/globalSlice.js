import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: "global",
    initialState: {
        value: {
            darkMode: false
        }
    },
    reducers: {
        setDarkMode: (state, { payload }) => {
            state.value.darkMode = payload
        },
    }
})

export const { setDarkMode } = globalSlice.actions
export default globalSlice.reducer