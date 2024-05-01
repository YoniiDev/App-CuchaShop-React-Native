import React from 'react'
import OrderScreen from '../screens/Orders'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const OrderStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='OrderScreen'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='OrderScreen' component={OrderScreen} />
        </Stack.Navigator>
    )
}

export default OrderStack;