import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import OrderData from '../data/orders.json'
import OrderItem from '../components/OrderItem.jsx'
import OrderLayout from '../components/darkModeLayout/OrderLayout.jsx'

const OrderScreen = () => {
    return (
        <OrderLayout>
            <FlatList
                style={styles.flatlistContainer}
                data={OrderData}
                keyExtractor={orderItem => orderItem.id}
                renderItem={({ item, index }) => {

                    const isLastOrderCard = index === OrderData.length - 1

                    return (
                        <OrderItem
                            order={item}
                            isLastOrderCard={isLastOrderCard}
                        />
                    )
                }}
            />
        </OrderLayout>
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    
    flatlistContainer: {
        padding: 10,
    },
})