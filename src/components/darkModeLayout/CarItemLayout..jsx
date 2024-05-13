import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { useSelector } from 'react-redux'


const CartItemLayout = ({ children }) => {
    const isDark = useSelector(state => state.global.value.darkMode)
    const backgroundColor = isDark ? colors.dark1 : colors.white
    const borderColor = isDark ? colors.green1 : colors.green2
    return (
        <View style={{ ...styles.container, backgroundColor: backgroundColor, borderColor: borderColor }}>
            {children}
        </View>
    )
}

export default CartItemLayout

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
        marginBottom: 6
    },
})