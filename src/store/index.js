import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/Counter/counterSlice'
import shopReducer from '../features/Shop/shopSlice'
import globalReducer from '../features/Global/globalSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
        global: globalReducer
    }
})