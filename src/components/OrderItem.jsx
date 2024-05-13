import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import OrderItemLayout from './darkModeLayout/OrderItemLayout'
import { useSelector } from 'react-redux'

const OrderItem = ({ order, isLastOrderCard }) => {

    const isDark = useSelector(state => state.global.value.darkMode)
    const textColor = isDark ? colors.dark6 : colors.black

    const total = order.items.reduce((acumulador, currenItem) => {
        const price = currenItem.offerPrice > 0 ? currenItem.offerPrice : currenItem.normalPrice
        const subtotal = price * currenItem.quantity
        return acumulador + subtotal
    }, 0)

    return (
        <OrderItemLayout style={{ marginBottom: isLastOrderCard ? 0 : 10 }} onPress={() => { }}>
            <View style={styles.textContainer}>
                <Text style={{ ...styles.idText, color: textColor }}>Id de Orden: {order.id}</Text>
                <Text style={{ ...styles.dateText, color: textColor }}>
                    Fecha de Compra: {new Date(order.createdAt).toLocaleString()}
                </Text>
                <Text style={{ ...styles.totalText, color: textColor }}>Total: ${total}</Text>
            </View>
            <Feather style={styles.searchIcon} name='search' size={24} color={textColor} />
        </OrderItemLayout >
    )
}

export default OrderItem

const styles = StyleSheet.create({
    
    textContainer: {
        width: '85%',
    },
    idText: {
        fontFamily: 'OpenSans_SemiCondensed-Regular'
    },
    dateText: {

        fontFamily: 'OpenSans_SemiCondensed-Regular'
    },
    totalText: {

        fontFamily: 'OpenSans_SemiCondensed-SemiBold'
    },
    searchIcon: {

    }
})