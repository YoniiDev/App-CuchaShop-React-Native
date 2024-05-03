import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartData from '../data/cart.json'
import CartItem from '../components/CartItem.jsx'
import { colors } from '../constants/colors.js'

const Cart = () => {

    const total = CartData.reduce((acumulador, currentItem) => {
        const price = currentItem.offerPrice > 0 ? currentItem.offerPrice : currentItem.normalPrice
        const subtotal = price * currentItem.quantity
        return acumulador + subtotal
    }, 0)

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={CartData}
                keyExtractor={cartItem => cartItem.id}
                renderItem={({ item }) => {
                    return (
                        <CartItem
                            cartItem={item}
                        />
                    )
                }}
            />
            <View style={styles.confirmAndTotalContainer}>
                <Pressable style={styles.pressableConfirm}>
                    <Text style={styles.textConfirm}>Confirmar</Text>
                </Pressable>
                <Text style={styles.textTotal}>Total: ${total}</Text>
            </View>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    flatList: {
        padding: 10,
    },
    confirmAndTotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.white,
        borderWidth: 2,
        borderColor: colors.green3,
        borderRadius: 10,
        marginHorizontal: 10
    },
    pressableConfirm: {

    },
    textConfirm: {
        borderRadius: 4,
        backgroundColor: colors.green1,
        color: colors.white,
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    textTotal: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 16,
        color: 'black'
    },
})