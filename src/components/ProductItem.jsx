import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './Card'
import { colors } from '../constants/colors'

const ProductItem = ({ product }) => {
  return (

    <Card style={styles.additionalStylesCard}>
      <Text style={styles.textCategory}>{product.title}</Text>
      <Image
        resizeMode='cover'
        style={styles.image}
        source={{ uri: product.images[0] }}
      />
    </Card>

  )
}

export default ProductItem

const styles = StyleSheet.create({
  additionalStylesCard: {
 borderColor: 'red',
 borderWidth: 2
  },

  image: {
    height: 150,
    width: 150,
    borderRadius: 8
  },
  textCategory: {
    color: 'black'
  }
})