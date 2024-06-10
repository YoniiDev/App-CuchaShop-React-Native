import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseURL } from "../databases/realtimeDatabase"

export const shopApi = createApi({
    //reducerPath: establece un nombre unico para la api.
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    //tagTypes: Declara los tags.
    tagTypes: ['profileImageGet', 'locationGet'],
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
        }),
        //Obtiene la imagen de perfil del usuario.
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ['profileImageGet']
        }),
        //Guarda la imagen de perfil, en formato base64 en RTDataBase.
        postProfileImage: builder.mutation({
            query: ({ image, localId }) => ({
                url: `profileImages/${localId}.json`,
                method: 'PUT',
                body: {
                    image: image
                }
            }),
            invalidatesTags: ['profileImageGet']
        }),
        //Obtiene la información de la ubicación del usuario desde RTDataBase.
        getLocation: builder.query({
            query: (localId) => `locations/${localId}.json`,
            providesTags: ['locationGet']
        }),
        //Guarda la información de la ubicación del usuario en RTDataBase.
        postLocation: builder.mutation({
            query: ({ location, localId }) => ({
                //location es la colección donde se guardará la información de la dirección del usuario.
                url: `locations/${localId}.json`,
                //se utiliza el metodo PUT para evitar generar una nueva id, ya que se esta indicando el id del usuario.
                method: "PUT",
                //La información del body se almacenará en la colección locations de RTDataBase, con la id del usuario.
                body: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                    updatedAt: location.updatedAt
                },
            }),
            invalidatesTags: ['locationGet']
        }),
        //Elimina la ubicaión del usuario en RTDataBase
        deleteLocation: builder.mutation({
            query: (localId) => ({
                url: `locations/${localId}.json`,
                method: "DELETE",
            }),
            invalidatesTags: ['locationGet']
        })
    })
})

export const {
    useGetCategoriesQuery,
    useGetProductByIdQuery,
    useGetProductsByCategoryQuery,
    usePostOrderMutation,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    useGetLocationQuery,
    usePostLocationMutation,
    useDeleteLocationMutation
} = shopApi