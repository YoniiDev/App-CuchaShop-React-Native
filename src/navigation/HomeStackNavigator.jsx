import { StyleSheet } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Home from '../screens/Home'
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
                            console.log(route);
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

const styles = StyleSheet.create({

})