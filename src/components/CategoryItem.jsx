import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors';
import Card from './Card';

const CategoryItem = ({ category, navigation }) => {


    return (
        <Card style={styles.additionalStyleCard}>
            <Pressable style={styles.pressable} onPress={() => navigation.navigate('ItemListCategory', {category})}>
                <View style={styles.imageContainer}>
                    {category === "Alimento Cachorro" && <Image style={styles.imageCategory} resizeMode='cover' source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cuchashop-3cceb.appspot.com/o/alimentocachorro.jpg?alt=media&token=1a692c37-d783-42dc-812a-460fb9c496f2' }} />}
                    {category === "Alimento Perro Adulto" && <Image style={styles.imageCategory} resizeMode='cover' source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cuchashop-3cceb.appspot.com/o/alimentoperroadulto.jpg?alt=media&token=cce8f958-7b81-46b8-8df5-12feb91b17e0' }} />}
                    {category === "Alimento Gato Adulto" && <Image style={styles.imageCategory} resizeMode='cover' source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cuchashop-3cceb.appspot.com/o/alimentogatoadulto2.jpg?alt=media&token=396baa1b-753d-4c3a-9002-0dada6368cfb' }} />}
                    {category === "Alimento Gatito" && <Image style={styles.imageCategory} resizeMode='cover' source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cuchashop-3cceb.appspot.com/o/alimentogatito.jpg?alt=media&token=447a4445-07a1-440d-acbd-c5dec3ac0e3a' }} />}
                </View>
                <Text style={styles.textCategory}>{category}</Text>
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