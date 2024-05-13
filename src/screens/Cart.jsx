import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartData from '../data/cart.json'
import CartItem from '../components/CartItem.jsx'
import { colors } from '../constants/colors.js'
import CartLayout from '../components/darkModeLayout/CartLayout.jsx'
import { useSelector } from 'react-redux'

const Cart = () => {


    const isDark = useSelector(state => state.global.value.darkMode)
    const textColor = isDark ? colors.dark6 : colors.black
    const borderColor = isDark ? colors.green1 : colors.green2
    const backgroundColorConfirmAndTotalContainer = isDark ? colors.dark1 : colors.white

    const total = CartData.reduce((acumulador, currentItem) => {
        const price = currentItem.offerPrice > 0 ? currentItem.offerPrice : currentItem.normalPrice
        const subtotal = price * currentItem.quantity
        return acumulador + subtotal
    }, 0)

    return (
        <CartLayout>
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
            <View style={{ ...styles.confirmAndTotalContainer, backgroundColor: backgroundColorConfirmAndTotalContainer, borderColor: borderColor }}>
                <Pressable style={styles.pressableConfirm}>
                    <Text style={styles.textConfirm}>Confirmar</Text>
                </Pressable>
                <Text style={{ ...styles.textTotal, color: textColor }}>Total: ${total}</Text>
            </View>
        </CartLayout >
    )
}

export default Cart

const styles = StyleSheet.create({
    flatList: {
        padding: 10,
    },
    confirmAndTotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 2,
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
    },
})