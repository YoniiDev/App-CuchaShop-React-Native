import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            user: "userIdLogged",
            updateAt: new Date().toLocaleString(),
            total: null,
            items: [],
        }
    },
    reducers: {
        //Logica para añadir productos
        addCartItem: (state, { payload }) => {
            //Se busca si hay producto repetido en el array de items.
            const productRepeated = state.value.items.find(
                (item) => item.id === payload.id
            )
            //Logica que añade un producto cuando este ya existe en el array de items.
            if (productRepeated) {
                //Logica que genera un nuevo array de productos incluyendo aquel producto con su cantidad actualizada.
                const itemsUpdated = state.value.items.map((item) => {
                    if (item.id === payload.id) {
                        item.quantity += payload.quantity
                        return item
                    }
                    return item
                })
                //Logica para calcular el total con el array de productos actualizado.
                const total = itemsUpdated.reduce((acc, currentItem) => {
                    //Condicion que determina si el producto tiene precio de oferta o no.
                    const price = currentItem.offerPrice > 0 ? currentItem.offerPrice : currentItem.normalPrice
                    const subTotal = price * currentItem.quantity
                    return acc + subTotal
                }, 0)
                //Logica que actualiza el array de items, el total y la fecha.
                state.value = {
                    ...state.value,
                    items: itemsUpdated,
                    total,
                    updateAt: new Date().toDateString()
                }

            } else {
                //Logica que añade un nuevo producto al array de items.
                state.value.items.push(payload)
                //Logica que calcula el total.
                const total = state.value.items.reduce((acc, currentItem) => {
                    //Condicion que determina si el producto tiene precio de oferta o no
                    const price = currentItem.offerPrice > 0 ? currentItem.offerPrice : currentItem.normalPrice
                    const subTotal = price * currentItem.quantity
                    return acc + subTotal
                }, 0)
                //Logica que actualiza el total y la fecha.
                state.value = {
                    ...state.value,
                    total,
                    updateAt: new Date().toLocaleString(),
                }
            }
        },
        removeCartItem: (state, { payload }) => {
            //Logica para remover productos del carrito.
        },
        clearCart: (state) => {
            state.value.total = null
            state.value.items = []
        }
    }
})

export const { addCartItem, removeCartItem, clearCart } = cartSlice.actions
export default cartSlice.reducer