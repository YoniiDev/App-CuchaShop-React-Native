import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors';
import Card from './Card';

const CategoryItem = ({ category }) => {
    return (
        <Card>
            <Text style={styles.text}>{category}</Text>
        </Card>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    
    text: {
        color: 'red',
        textAlign: 'center',
        fontSize: 20,
    }
})