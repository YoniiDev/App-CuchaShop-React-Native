import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { useSelector } from 'react-redux'

const CartLayout = ({ children, style }) => {
    const isDark = useSelector(state => state.global.value.darkMode)
    const backgroundColor = isDark ? colors.dark2 : colors.white
    return (
        <View style={{ ...styles.container, backgroundColor: backgroundColor, ...style }}>
            {children}
        </View>
    )
}

export default CartLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingBottom: 10,
    },
})