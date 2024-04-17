import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors';
import Card from './Card';

const CategoryItem = ({ category, selectCategory = () => { } }) => {
    return (
        <Card style={styles.additionalStyleCard}>
            <Pressable onPress={() => selectCategory(category)}>
                <Text style={styles.textCategory}>{category}</Text>
            </Pressable>
        </Card>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    additionalStyleCard:{
        backgroundColor: colors.green3,
        height: 30,
        width: 200,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5
    },
    textCategory: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 18,
        borderColor: 'red',
        borderWidth: 2 
    }
})