import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/Counter/counterSlice'
import shopReducer from '../features/Shop/shopSlice'
import globalReducer from '../features/Global/globalSlice'
import cartReducer from '../features/Cart/cartSlice'
import { shopApi } from "../services/shopService";
import { setupListeners } from "@reduxjs/toolkit/query";


const store = configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
        global: globalReducer,
        cart: cartReducer,
        [shopApi.reducerPath]: shopApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware)
})

setupListeners(store.dispatch)

export default store