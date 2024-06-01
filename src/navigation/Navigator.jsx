import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import { useSelector } from 'react-redux'
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { colors } from '../constants/colors'

const Navigator = () => {

    //Configuración de las Tostadas
    const toastConfig = {
        //Configuración de la tostada de tipo succes.
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
        //Configuración de la tostada de tipo info
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

    //Constante que almacena el valor global de user.
    const { user } = useSelector(state => state.auth.value)

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