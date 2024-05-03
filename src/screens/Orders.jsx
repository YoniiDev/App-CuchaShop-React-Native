import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import OrderData from '../data/orders.json'
import OrderItem from '../components/OrderItem.jsx'

const OrderScreen = () => {
    return (
        <View style={styles.orderConatiner}>
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
        </View>
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    orderConatiner: {
        
    },
    flatlistContainer: {
        padding: 10,
    },
})