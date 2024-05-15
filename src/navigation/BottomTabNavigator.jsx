import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from './HomeStackNavigator'
import { colors } from '../constants/colors'
import CartStack from './CartStackNavigator'
import OrderStack from './OrderStackNavigator'
import Header from '../components/Header'
import { FontAwesome5 } from "@expo/vector-icons"
import { Ionicons } from '@expo/vector-icons'
import CartTemp from '../screens/CartTemp'
import OrdersTemp from '../screens/OrdersTemp'
import { useDispatch } from 'react-redux'
import { setIdSelected, setCategorySelected } from '../features/Shop/shopSlice'
import { useNavigation } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {

    const dispatch = useDispatch()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: route.name === 'Shop' ? false : true,
                header: () => {
                    return <Header title={
                        route.name === 'Cart' ? 'Carrito de Compras' :
                            route.name === 'Orders' ? 'Ordenes de Compra' :
                                ""} />
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
                    tabBarButton: (props) => (
                        < TouchableOpacity
                            {...props}
                            onPress={() => {
                                dispatch(setCategorySelected(''));
                                dispatch(setIdSelected(''));
                                props.onPress();
                            }}
                        />
                    )
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
        </Tab.Navigator>
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