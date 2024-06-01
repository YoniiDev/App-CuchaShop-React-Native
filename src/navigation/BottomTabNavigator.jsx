import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from './HomeStackNavigator'
import { colors } from '../constants/colors'
import CartStack from './CartStackNavigator'
import OrderStack from './OrderStackNavigator'
import Header from '../components/Header'
import { FontAwesome5 } from "@expo/vector-icons"
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import MyProfileStackNavigator from './MyProfileStackNavigator'

const Tab = createBottomTabNavigator()
const BottomTabNavigator = () => {

    //Constante que almacena el estado global de categorySelected.
    const categorySelected = useSelector(state => state.shop.value.categorySelected)

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                header: () => {
                    return <Header title={
                        categorySelected === 'Alimento Perro Adulto' ? 'Alimento Perro Adulto' :
                            categorySelected === 'Alimento Cachorro' ? 'Alimento Cachorro' :
                                categorySelected === 'Alimento Gato Adulto' ? 'Alimento Gato Adulto' :
                                    categorySelected === 'Alimento Gatito' ? 'Alimento Gatito' :
                                        route.name === 'Shop' ? 'CuchaShop' :
                                            route.name === 'Cart' ? 'Carrito de Compras' :
                                                route.name === 'Orders' ? 'Ordenes de Compra' :
                                                    ""
                    } />
                },
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen
                name='Shop'
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name='store'
                                    size={24}
                                    color={focused ? colors.green1 : "white"}
                                />
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name='Cart'
                component={CartStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name="shopping-cart"
                                    size={24}
                                    color={focused ? colors.green1 : "white"}
                                />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name='Orders'
                component={OrderStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons
                                    name='receipt'
                                    size={24}
                                    color={focused ? colors.green1 : "white"}
                                />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name='My profile'
                component={MyProfileStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons name="person-circle" size={30} color={ focused ? colors.green1 : "white"}  />
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator >
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.green3,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
})