import { FlatList } from 'react-native'
import CategoryItem from '../components/CategoryItem'
import categories from '../data/categories.json'
import ShopLayout from '../components/darkModeLayout/ShopLayout'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCategorySelected, setIdSelected } from '../features/Shop/shopSlice'

const Home = ({ navigation }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const isHomeFocused = navigation.addListener('focus', () => {
            dispatch(setCategorySelected(''))
            dispatch(setIdSelected(''))
        })

        return isHomeFocused
    }, [])
    return (
        <ShopLayout>
            <FlatList
                alignItems='center'
                showsVerticalScrollIndicator={false}
                keyExtractor={category => category.category}
                data={categories}
                renderItem={({ item }) => (
                    <CategoryItem
                        navigation={navigation}
                        category={item}
                    />
                )}
            />
        </ShopLayout>


    )
}

export default Home