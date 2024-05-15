
import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import products from '../data/products.json'
import ProductItem from '../components/ProductItem'
import SearchProduct from '../components/SearchProduct'
import ItemListCategoryLayout from '../components/darkModeLayout/ItemListCategoryLayout'
import { useDispatch } from 'react-redux'
import { setIdSelected } from '../features/Shop/shopSlice'

const ItemListCategory = ({ setCategorySelected = () => { }, navigation, route }) => {

    const [keyWord, setKeyword] = useState("")
    const [productsFiltered, setProductsFiltered] = useState([])
    const [error, setError] = useState("")
    const { category: categorySelected } = route.params
    const dispatch = useDispatch()

    useEffect(() => {
        const isItemListCategoryFocused = navigation.addListener('focus', () => {
            dispatch(setIdSelected(''))
        })

        return isItemListCategoryFocused
    }, [])

    useEffect(() => {

        const regexDigits = /\d/
        const hasDigits = regexDigits.test(keyWord)

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
        const productsPrefiltered = products.filter((product) => product.category === categorySelected.category)

        //PODUCTOS FILTRADOS POR NOMBRES
        const productsFilter = productsPrefiltered.filter((product) => product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()))
        setProductsFiltered(productsFilter)
        setError("")

    }, [keyWord, categorySelected.category])

    return (
        <ItemListCategoryLayout>
            <SearchProduct error={error} onSearch={setKeyword} navigation={navigation} />

            <FlatList
                style={styles.flatList}
                contentContainerStyle={styles.contentContainer}
                data={productsFiltered}
                renderItem={({ item }) => <ProductItem product={item} navigation={navigation} />}
                keyExtractor={(producto) => producto.id}
                numColumns={2}
            />
        </ItemListCategoryLayout>

    )
}

export default ItemListCategory

const styles = StyleSheet.create({

    flatList: {
        width:'100%'

    },
    contentContainer: {
        paddingVertical: 10,
        alignItems: 'center',
    }
})