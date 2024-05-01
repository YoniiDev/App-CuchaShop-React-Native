import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
import HomeStackNavigator from './HomeStackNavigator'

const Navigator = () => {
    return (
        <NavigationContainer>
            <BottomTabNavigator />
            {/* <HomeStackNavigator /> */}
        </NavigationContainer >
    )
}

export default Navigator

const styles = StyleSheet.create({})