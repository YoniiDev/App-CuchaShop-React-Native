
import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem'
import SearchProduct from '../components/SearchProduct'
import ItemListCategoryLayout from '../components/darkModeLayout/ItemListCategoryLayout'
import { useDispatch } from 'react-redux'
import { setIdSelected } from '../features/Shop/shopSlice'
import { reset } from '../features/Counter/counterSlice'
import { useGetProductsByCategoryQuery } from '../services/shopService'

const ItemListCategory = ({ navigation, route }) => {

    //Constante que almacena el dato ingresado por el usuario.
    const [keyWord, setKeyword] = useState("")
    //Constante que almacena los productos filtrados.
    const [productsFiltered, setProductsFiltered] = useState([])
    //Constante para almacenar el tipo de error.
    const [error, setError] = useState("")
    //Constante que almacena la categoria seleccionada.
    const { category: categorySelected } = route.params
    const dispatch = useDispatch()

    const { data: productsFetched, error: errorFromFetch, isLoading } = useGetProductsByCategoryQuery(categorySelected)

    //UseEffect para restablecer valores globales
    //Este useEffect se encarga de volver al estado inicial los valores de las variables globales, cuando el usuario presiona el boton de
    //volver del sistema operativo Android y no utiliza niguno de los botones de GoBack de la app.
    useEffect(() => {
        const isItemListCategoryFocused = navigation.addListener('focus', () => {
            //Primero setea a string vacio itemIdSelected.
            dispatch(setIdSelected(''))
            //Y por ultimo, resetea el contador a 0.
            dispatch(reset())
        })

        return isItemListCategoryFocused
    }, [])

    useEffect(() => {

        //Regex
        //Expresión regular que evalua si keyword contiene números o no.
        const regexDigits = /\d/
        const hasDigits = regexDigits.test(keyWord)

        if (hasDigits) {
            //Si keyword contiene almenos un número setea la constante error.
            setError("No utilizar números")
            return
        }

        //Expresión regular que evalua si keyword tiene tres caracteres o no.
        const regexThreeOrMoreChars = /[a-zA-Z]{3,}/
        const hasThreeOrMoreChars = regexThreeOrMoreChars.test(keyWord)

        if (!hasThreeOrMoreChars && keyWord.length) {
            //Si tiene menos de tres caracteres setea la constante error con el siguiente texto.
            setError('Ingrese 3 o más letras')
            return
        }

        //PODUCTOS FILTRADOS POR NOMBRES
        if (!isLoading) {
            const productsFilter = productsFetched.filter((product) => product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()))
            setProductsFiltered(productsFilter)
            setError("")
        }

    }, [keyWord, categorySelected, productsFetched, isLoading])

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
        width: '100%'

    },
    contentContainer: {
        paddingVertical: 10,
        alignItems: 'center',
    }
})