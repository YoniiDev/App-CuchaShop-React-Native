import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartData from '../data/cart.json'
import CartItem from '../components/CartItem.jsx'

const Cart = () => {
    
    const total = CartData.reduce((acumulador, currentItem) => acumulador += currentItem.offerPrice * currentItem.quantity, 0)

    return (
        <View style={styles.container}>
            <FlatList
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
            <View style={styles.totalContainer}>
                <Pressable>
                    <Text>
                        Confirm 
                        
                    </Text>
                </Pressable>

            </View>

        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    
})