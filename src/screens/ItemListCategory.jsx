
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import products from '../data/products.json'
import ProductItem from '../components/ProductItem'
import SearchProduct from '../components/SearchProduct'

const ItemListCategory = ({ categorySelected = "", setCategorySelected = () => { } }) => {
  const [keyWord, setKeyword] = useState("")
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const regexDigits = /\d/
    const hasDigits = (regexDigits.test(keyWord));

    if (hasDigits) {
      setError("No utilizar números")
      return
    }

    const regexThreeOrMoreChars = /[a-zA-Z]{3,}/
    const regexZeroChars = /[a-zA-Z]{0}/
    const hasThreeOrMoreChars = regexThreeOrMoreChars.test(keyWord)
    const hasZeroChars = regexZeroChars.test(keyWord)
    if(!hasThreeOrMoreChars && !hasZeroChars){
      setError('Ingrese 3 o más letras')
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
    <View style={styles.flatListAndSearchContainer}>
      <SearchProduct error={error} onSearch={setKeyword} goBack={() => setCategorySelected("")} />

      <FlatList
        style={styles.flatList}
        data={productsFiltered}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(producto) => producto.id}
        numColumns={2}
        alignItems='center'
      />

    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  flatListAndSearchContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.green2,
    alignItems: 'center',
  },
  flatList: {
    backgroundColor: 'black',
    width: '100%',
  }
})