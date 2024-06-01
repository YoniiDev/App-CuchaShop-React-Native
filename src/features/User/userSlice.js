import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        value: {
            user: null,
            token: null,
            localId: null,
            imageCamera: null,
        }
    },
    reducers: {
        //Acción que setea el estado global en redux de user, token y localId.
        setUser: (state, { payload }) => {
            state.value.user = payload.email
            state.value.token = payload.idToken
            state.value.localId = payload.localId
        },
        clearUser: (state) => {
            state.value.user = null
            state.value.token = null
        },
        //Accion que setea la foto de perfil del usuario en el estado global de imageCamera.
        setCameraImage: (state, { payload }) => {
            state.value.imageCamera = payload
        }
    }
})

export const { setUser, clearUser, setCameraImage } = authSlice.actions

export default authSlice.reducer