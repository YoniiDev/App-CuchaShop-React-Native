import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state, action) => {
            if(state.value < action.payload)
            state.value += 1
        },
        decrement: (state) => {
            if(state.value > 0)
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        reset: (state) => {
            state.value = 0
        }
    } 
})

export const {increment, decrement, incrementByAmount, reset} = counterSlice.actions
export default counterSlice.reducer