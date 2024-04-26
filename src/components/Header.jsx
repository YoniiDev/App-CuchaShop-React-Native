import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import { FontAwesome } from '@expo/vector-icons';
import products from '../data/products.json'

const Header = ({ title }) => {

    const [product, setProduct] = useState({})

    useEffect(() => {
        if (title > 0) {
            const productFound = products.find((product) => product.id === title)
            setProduct(productFound)
        }
    }, [title])

    return (
        <>
            {/* Home Header */}
            {
                title === 'CuchaShop' ?
                    <View style={styles.headerContainer}>
                        <View style={styles.brandAndLogoContainer}>
                            <Text style={styles.textTitle}>{title}</Text>
                            <Image
                                style={styles.logo}
                                resizeMode='cover'
                                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cuchashop-3cceb.appspot.com/o/dog.png?alt=media&token=f8eaad94-a171-4b9f-b01f-e5f52d5b6fca' }}
                            />
                        </View>
                        <FontAwesome name="user-circle-o" size={34} color="white" />
                    </View>

                    : title > 0 ?
                        <View style={styles.screenHeaderContainer}>
                            <Text style={styles.screensTitleText}>{product.category}</Text>
                            <FontAwesome name="user-circle-o" size={34} color="white" />
                        </View>

                        :
                        // Screens Header
                        <View style={styles.screenHeaderContainer}>
                            <Text style={styles.screensTitleText}>{title}</Text>
                            <FontAwesome name="user-circle-o" size={34} color="white" />
                        </View>
            }
        </>

    )
}

export default Header

const styles = StyleSheet.create({
    // Home Header
    headerContainer: {
        width: '100%',
        height: 50,
        backgroundColor: colors.green3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1,
        paddingHorizontal: 6
    },
    brandAndLogoContainer: {
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 1
    },
    textTitle: {
        fontFamily: 'OpenSans_SemiCondensed-ExtraBold',
        color: colors.white,
        fontSize: 24,
        borderColor: 'red',
        borderWidth: 1
    },

    logo: {
        height: 40,
        width: 40,
        borderColor: 'red',
        borderWidth: 1
    },

    // Screen Header
    screenHeaderContainer: {
        width: '100%',
        height: 50,
        backgroundColor: colors.green3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1,
        paddingHorizontal: 6
    },

    screensTitleText: {
        fontFamily: 'OpenSans_SemiCondensed-SemiBold',
        color: colors.white,
        fontSize: 20,
        borderColor: 'red',
        borderWidth: 1
    },


})