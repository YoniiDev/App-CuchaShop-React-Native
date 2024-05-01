import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const Card = ({ children, style }) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            {children}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        width: 170,
        height: 260,
        shadowColor: "#000000",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    }
})