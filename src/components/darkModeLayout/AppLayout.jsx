import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { useSelector } from 'react-redux'

const AppLayout = ({ children }) => {
    const itemIdSelected = useSelector(state => state.shop.value.itemIdSelected)
    const isItemIdSelected = itemIdSelected ? true : false
    const isDark = useSelector(state => state.global.value.darkMode)
    const backgroundColorMain = isDark ? colors.dark2 : colors.white
    const backgroundColorSecond = isDark ? colors.dark1 : colors.white
    const backgroundColor = isItemIdSelected ?  backgroundColorSecond : backgroundColorMain
    return (
        <View style={{ ...styles.container, backgroundColor: backgroundColor}}>
            {children}
        </View>
    )
}

export default AppLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
})