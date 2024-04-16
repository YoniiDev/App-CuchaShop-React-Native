
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
    <View style={styles.flatListAndSearchContainer}>
      <SearchProduct error={error} onSearch={setKeyword} goBack={() => setCategorySelected("")} />
      <View style={styles.flatListContainer}>
        <FlatList
          style={styles.flatList}
          data={productsFiltered}
          renderItem={({ item }) => <ProductItem product={item} />}
          keyExtractor={(producto) => producto.id}
          numColumns={2}
        />
      </View>
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  flatListAndSearchContainer: {
    width: '100%',
    backgroundColor: colors.green2,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },

  flatListContainer: {
    backgroundColor: 'black',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  flatList: {
    
  }
})