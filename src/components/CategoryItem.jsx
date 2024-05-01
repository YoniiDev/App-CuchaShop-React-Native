import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors';
import Card from './Card';

const CategoryItem = ({ category, navigation }) => {
    
    return (
        <Card style={styles.additionalStyleCard}>
            <Pressable style={styles.pressable} onPress={() => navigation.navigate('ItemListCategory', {category})}>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageCategory} resizeMode='cover' source={{ uri: category.image }} />
                   
                </View>
                <Text style={styles.textCategory}>{category.category}</Text>
            </Pressable>
        </Card>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    additionalStyleCard: {
        height: 200,
        width: '100%',
        borderRadius: 18,
        marginVertical: 5,
        borderColor: colors.green1,
        borderWidth: 2,
        position: 'relative'
    },
    pressable: {
        width: '100%',
        height: '100%',
        borderRadius: 18
    },
    imageContainer: {
        width: 320,
        height: '100%',
        backgroundColor: 'white',
        position: 'relative',
        borderRadius: 18
    },
    imageCategory: {
        width: '100%',
        height: '100%',
        borderRadius:18
    },
    textCategory: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        color: colors.white,
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 3,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgb(13, 17, 23)',
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18
    }
})