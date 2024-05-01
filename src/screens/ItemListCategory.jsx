
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import products from '../data/products.json'
import ProductItem from '../components/ProductItem'
import SearchProduct from '../components/SearchProduct'

const ItemListCategory = ({ setCategorySelected = () => { }, setItemIdSelected = () => { }, navigation, route }) => {

    const [keyWord, setKeyword] = useState("")
    const [productsFiltered, setProductsFiltered] = useState([])
    const [error, setError] = useState("")

    const { category: categorySelected } = route.params

    useEffect(() => {
        
        const regexDigits = /\d/
        const hasDigits = (regexDigits.test(keyWord));

        if (hasDigits) {
            setError("No utilizar números")
            return
        }

        const regexThreeOrMoreChars = /[a-zA-Z]{3,}/
        const hasThreeOrMoreChars = regexThreeOrMoreChars.test(keyWord)

        if (!hasThreeOrMoreChars && keyWord.length) {
            setError('Ingrese 3 o más letras')
            return
        }

        //PRODUCTOS FILTRADOS POR CATEGORIAS
        const productsPrefiltered = products.filter(product => product.category === categorySelected.category)
        
        //PODUCTOS FILTRADOS POR NOMBRES
        const productsFilter = productsPrefiltered.filter(product => product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()))
        setProductsFiltered(productsFilter)
        setError("")
        
    }, [keyWord, categorySelected.category])

    return (
        <View style={styles.flatListAndSearchContainer}>
            <SearchProduct error={error} onSearch={setKeyword} goBack={() => navigation.goBack()} />

            <FlatList
                style={styles.flatList}
                data={productsFiltered}
                renderItem={({ item }) => <ProductItem product={item} navigation={navigation} />}
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
    }
})