import { StyleSheet, View } from 'react-native'
import React from 'react'
import CartStack from './CartStackNavigator'
import OrderStack from './OrderStackNavigator'
import Header from '../components/Header'
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons"
import { Ionicons } from '@expo/vector-icons'
import CartTemp from '../screens/CartTemp'
import OrdersTemp from '../screens/OrdersTemp'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from './HomeStackNavigator'
import { colors } from '../constants/colors'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header title={route.name} route={route} />
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
          }
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
    color: "black",
  },
})