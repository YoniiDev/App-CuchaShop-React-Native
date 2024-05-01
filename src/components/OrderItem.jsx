import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { colors } from '../constants/colors'

const OrderItem = ({ order }) => {
 
  const total = order.items.reduce((acumulador, currenItem) => (acumulador += currenItem.offerPrice * currenItem.quantity), 0)
  return (
    <View style={styles.card} onPress={() => { }}>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>
          {new Date(order.createdAt).toLocaleString()}
        </Text>
        <Text style={styles.totalText}>${total}</Text>
      </View>
      <Feather name='search' size={24} color='black'/>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({})