import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            categorySelected: '',
            itemIdSelected: ''
        }
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.value.categorySelected = action.payload
        },
        setIdSelected: (state, { payload }) => {
            state.value.itemIdSelected = payload
        }
    }
})

export const { setCategorySelected, setIdSelected } = shopSlice.actions
export default shopSlice.reducer