
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import products from '../data/products.json'
import ProductItem from '../components/ProductItem'
import Search from '../components/Search'

const ItemListCategory = ({ categorySelected = "", setCategorySelected = () => { } }) => {
  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    let regex = /\d/
    const hasDigits = (regex.test(keyWord));

    if (hasDigits) {
      setError("No utilizar numeros")
      return
    }
    //PRODUCTOS FILTRADOS POR CATEGORIAS
    const productsPrefiltered = products.filter(product => product.category === categorySelected)

    //PODUCTOS FILTRADOS POR NOMBRES
    const productsFilter = productsPrefiltered.filter(product => product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()))
    setProductsFiltered(productsFilter)
    setError("")
  }, [keyWord, categorySelected])

  return (
    <View style={styles.flatListContainer}>
      <Search error={error} onSearch={setKeyword} goBack={() => setCategorySelected("")} />
      <FlatList
        data={productsFiltered}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(producto) => producto.id}
      />
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',
    backgroundColor: colors.green2,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
})