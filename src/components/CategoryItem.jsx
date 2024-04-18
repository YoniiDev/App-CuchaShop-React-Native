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
    additionalStyleCard: {
        backgroundColor: colors.green3,
        height: 30,
        width: 220,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderColor: 'red',
        borderWidth: 2,
    },
    textCategory: {
        fontFamily: 'OpenSans_SemiCondensed-Medium',
        color: colors.white,
        textAlign: 'center',
        fontSize: 16,
        borderColor: 'red',
        borderWidth: 2,
        paddingTop:3
    }
})