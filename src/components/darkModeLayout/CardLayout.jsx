import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { useSelector } from 'react-redux'

const CardLayout = ({ children, style }) => {
    const isDark = useSelector(state => state.global.value.darkMode)
   const backgroundColor = isDark ? colors.dark1 : colors.white
    return (
        <View style={{ ...styles.container, ...style, backgroundColor: backgroundColor }}>
            {children}
        </View>
    )
}

export default CardLayout

const styles = StyleSheet.create({
    container: {
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