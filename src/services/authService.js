import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey, baseAuthUrl } from "../databases/users"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseAuthUrl }),
    endpoints: (builder) => ({
        //Registra un nuevo usuario
        signUp: builder.mutation({
            query: ({ ...auth }) => ({
                url: `/accounts:signUp?key=${apiKey}`,
                method: "POST",
                body: auth,
            })
        }),
        //Inicia Sesión
        signIn: builder.mutation({
            query: ({ ...auth }) => ({
                url: `/accounts:signInWithPassword?key=${apiKey}`,
                method: "POST",
                body: auth
            })
        })

    })
})

export const { useSignInMutation, useSignUpMutation } = authApi