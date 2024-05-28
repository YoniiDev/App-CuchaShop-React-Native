import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseURL } from "../databases/realtimeDatabase"

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        //Obtiene todas las categorias
        getCategories: builder.query({
            query: () => `categories.json`
        }),
        //Obtiene los productos por categoria
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                //Transforma la respuesta de RTDataBases de objeto a un array de objetos
                const responseTransformed = Object.values(response)
                return responseTransformed
            }
        }),
        //Obtiene los productos por id.
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                //Transforma la respuesta de RTDataBases de objeto a un array de objetos
                const responseTransformed = Object.values(response)
                if (responseTransformed.length) return responseTransformed[0]
                return null
            }
        }),
        //Genera una orden de compra.
        postOrder: builder.mutation({
            query: ({ ...order }) => ({
                url: 'orders.json',
                method: 'POST',
                body: order
            })
        })
    })
})

export const {
    useGetCategoriesQuery,
    useGetProductByIdQuery,
    useGetProductsByCategoryQuery,
    usePostOrderMutation
} = shopApi