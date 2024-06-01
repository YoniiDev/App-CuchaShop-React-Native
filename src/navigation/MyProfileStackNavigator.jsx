import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProfile from '../screens/MyProfile'
import ImageSelector from '../screens/ImageSelector'

const Stack = createNativeStackNavigator()

const MyProfileStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRoutename='My Profile Stack'
            screenOptions={{
                headerShown: false,
            }}
        >

            <Stack.Screen component={MyProfile} name='My Profile Stack' />
            <Stack.Screen component={ImageSelector} name='Image selector' />

        </Stack.Navigator>
    )
}

export default MyProfileStackNavigator