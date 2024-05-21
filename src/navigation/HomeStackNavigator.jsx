import React, { useEffect } from 'react'
import Home from '../screens/Home'
import ItemListCategory from '../screens/ItemListCategory'
import ItemDetail from '../screens/ItemDetail'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()
const HomeStackNavigator = () => {

    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen component={Home} name='Home' />
            <Stack.Screen component={ItemListCategory} name='ItemListCategory' />
            <Stack.Screen component={ItemDetail} name='ItemDetail' />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator