import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen component={LoginScreen} name='Login' />
            <Stack.Screen component={SignupScreen} name='Signup' />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})