import React from 'react'
import Home from '../screens/Home'
import Header from '../components/Header'
import ItemListCategory from '../screens/ItemListCategory'
import ItemDetail from '../screens/ItemDetail'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()
const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={
                ({ route }) => (

                    {
                        header: () => {
                            return <Header title={
                                route.name === 'Home' ? 'CuchaShop' :
                                    route.name === 'ItemListCategory' ? route.params.category.category :
                                        route.name === 'ItemDetail' ? route.params.productId :
                                            ""} />
                        }
                    }
                )
            }>
            <Stack.Screen component={Home} name='Home' />
            <Stack.Screen component={ItemListCategory} name='ItemListCategory' />
            <Stack.Screen component={ItemDetail} name='ItemDetail' />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator