import { FlatList } from 'react-native'
import CategoryItem from '../components/CategoryItem'
import ShopLayout from '../components/darkModeLayout/ShopLayout'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCategorySelected, setIdSelected } from '../features/Shop/shopSlice'
import { reset } from '../features/Counter/counterSlice'
import { useGetCategoriesQuery } from '../services/shopService'

const Home = ({ navigation }) => {

    const dispatch = useDispatch()

    //Obtiene las categorias de RTDataBase.
    const { data: categories, error, isLoading } = useGetCategoriesQuery()

    //UseEffect para restablecer valores globales.
    // Este useEffect se encarga de restablecer al valor inicial el estado de las variables globales, cuando el usuario vuelve a la pantalla 
    // de Home presionando el boton de volver de la interfaz de Android y el icono store del tabBar de la app.
    useEffect(() => {
        const isHomeFocused = navigation.addListener('focus', () => {
            //Setea el estado global de categorySelected a string vacio.
            dispatch(setCategorySelected(''))
            //Setea el estado global de itemIdSelected a string vacio.
            dispatch(setIdSelected(''))
            //Resetea el contador a 0.
            dispatch(reset())
        })

        return isHomeFocused
    }, [])

    return (
        <ShopLayout>
            <FlatList
                alignItems='center'
                showsVerticalScrollIndicator={false}
                keyExtractor={categories => categories.category}
                data={categories}
                renderItem={({ item }) => (
                    <CategoryItem
                        navigation={navigation}
                        categories={item}
                    />
                )}
            />
        </ShopLayout>


    )
}

export default Home