import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { colors } from '../constants/colors'

const OrderItem = ({ order, isLastOrderCard}) => {
    const total = order.items.reduce((acumulador, currenItem) => {
        const price = currenItem.offerPrice > 0 ? currenItem.offerPrice : currenItem.normalPrice
        const subtotal = price * currenItem.quantity
        return acumulador + subtotal
    }, 0)
    return (
        <View style={[styles.orderCard, { marginBottom: isLastOrderCard ? 0 : 10 }]} onPress={() => { }}>
            <View style={styles.textContainer}>
                <Text style={styles.idText}>Id de Orden: {order.id}</Text>
                <Text style={styles.dateText}>
                    Fecha de Compra: {new Date(order.createdAt).toLocaleString()}
                </Text>
                <Text style={styles.totalText}>Total: ${total}</Text>
            </View>
            <Feather style={styles.searchIcon} name='search' size={24} color='black' />
        </View>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    orderCard: {
        // height: 100,
        backgroundColor: colors.white,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.green2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        width: '85%',
        // borderWidth: 2
    },
    idText: {
        fontFamily: 'OpenSans_SemiCondensed-Regular'
    },
    dateText: {
        // borderWidth: 1,
        fontFamily: 'OpenSans_SemiCondensed-Regular'
    },
    totalText: {
        // borderWidth: 1,
        fontFamily: 'OpenSans_SemiCondensed-SemiBold'
    },
    searchIcon: {
        // borderWidth: 1,
    }
})