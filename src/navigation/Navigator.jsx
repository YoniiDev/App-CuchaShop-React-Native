import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { getSession } from '../persistence'
import { setUser } from '../features/User/userSlice'
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { colors } from '../constants/colors'

const Navigator = () => {

    //Configuración de las Tostadas
    const toastConfig = {
        //Configuración de la tostada de tipo success.
        success: (props) => (
            <BaseToast
                {...props}
                style={{
                    backgroundColor: 'white',
                    borderLeftColor: colors.green1,
                    height: 'auto'
                }}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingVertical: 15
                }}
                text2NumberOfLines={null}
            />
        ),
        //Configuración de la tostada de tipo error.
        error: (props) => (
            <ErrorToast
                {...props}
                style={{
                    backgroundColor: 'white',
                    borderLeftColor: 'red',
                    height: 'auto'
                }}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingVertical: 15
                }}
                text2NumberOfLines={null}
            />
        ),
        //Configuración de la tostada de tipo info.
        info: (props) => (
            <InfoToast
                {...props}
                style={{
                    backgroundColor: 'white',
                    borderLeftColor: 'blue',
                    height: 'auto'
                }}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingVertical: 10
                }}
                text2NumberOfLines={null}
            />
        )
    }

    //Constante que almacena el valor global de user desde Redux.
    const { user } = useSelector(state => state.auth.value)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                //Se obtiene los datos de la sesión del usuario (email, localId y token) desde la tabla session de sqLite.
                const response = await getSession()
                if (response.rows._array.length) {
                    //luego se setea la información del usuario (email, localId y token) en el estado global de redux.
                    const user = response.rows._array[0]
                    dispatch(setUser({
                        email: user.email,
                        localId: user.localId,
                        idToken: user.token
                    }))
                }
            } catch (error) {
                //en caso de haber algun error se muestra el siguiente mensaje al usuario.
                Toast.show({
                    type: 'error',
                    text1: 'Error al iniciar session',
                    text2: 'Ha ocurrido un error al intentar obtener los datos de la sessión del usuario desde la base de datos local.',
                    autoHide: true,
                    visibilityTime: 6000,
                    topOffset: 50,
                    text1Style: {
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                    text2Style: {
                        fontSize: 14,
                        color: 'black'
                    },

                });
            }
        })()
    }, [])

    return (
        <>
            <NavigationContainer>
                {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
            </NavigationContainer >
            {/* Etiqueta necesaria para el funcionamiento y configuración de las distintas Tostadas. */}
            <Toast config={toastConfig} />
        </>
    )
}

export default Navigator