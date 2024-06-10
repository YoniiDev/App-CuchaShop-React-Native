import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProfile from '../screens/MyProfile'
import ImageSelector from '../screens/ImageSelector'
import LocationSelector from '../screens/LocationSelector'
import ListAddress from '../screens/ListAddress'

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
            <Stack.Screen component={ListAddress} name='List Address' />
            <Stack.Screen component={LocationSelector} name='Location Selector' />

        </Stack.Navigator>
    )
}

export default MyProfileStackNavigator