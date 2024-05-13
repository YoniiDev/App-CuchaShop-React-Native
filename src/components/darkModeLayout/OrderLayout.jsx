import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { useSelector } from 'react-redux'

const OrderLayout = ({ children }) => {
    const isDark = useSelector(state => state.global.value.darkMode)
    const backgroundColor = isDark ? colors.dark2 : colors.white
    return (
        <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
            {children}
        </View>
    )
}

export default OrderLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})