import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { useSelector } from 'react-redux'

const ItemDetailLayout = ({ children }) => {
    const isDark = useSelector(state => state.global.value.darkMode)
    const backgroundColor = isDark ? colors.dark1 : colors.white
    return (
        <View style={{ ...styles.flatListContainer, backgroundColor: backgroundColor }}>
            {children}
        </View>
    )
}

export default ItemDetailLayout

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        width: '100%'
    },
})