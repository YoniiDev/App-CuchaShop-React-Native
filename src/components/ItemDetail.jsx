import { ScrollView, Image, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import allProducts from '../data/products.json'
import { colors } from '../constants/colors'

const ItemDetail = ({ idSelected, setProductSelected }) => {

    const [product, setProduct] = useState(null)

    useEffect(() => {
        const productSelected = allProducts.find((product) => product.id === idSelected)
        setProduct(productSelected)
    }, [idSelected])

    return (
        <ScrollView style={styles.main}>
            {product && product.offerPrice > 0 ? (
                <View style={styles.mainContainer}>
                    <View style={styles.cardContainer}>
                        <Text style={styles.textTitle}>{product.title}</Text>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: product.images[0] }}
                                style={styles.image}
                                resizeMode='contain'
                            />

                        </View>
                        <View style={styles.texContainer}>
                            <Text style={styles.textBrand}>{product.brand}</Text>
                            <View style={styles.offerPriceAndDiscountPercentageContainer}>
                                <Text style={styles.textOfferPrice}>${product.offerPrice}</Text>
                                <Text style={styles.textDiscountPercentage}>{product.discountPercentage * 100}% OFF</Text>
                            </View>
                            <Text style={styles.textNormalPrice}>${product.normalPrice}</Text>
                        </View>
                    </View>


                    <View style={styles.buttonConatiner}>
                        <Button title='Añadir'></Button>
                        <Button onPress={() => setProductSelected("")} title="Volver" />
                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.titleDescription}>Descripción:</Text>
                        <Text style={styles.textDescription}>{product.description}</Text>
                    </View>
                </View>
            )
                :
                product && product.offerPrice === 0 ? (
                    <View style={styles.mainContainer}>
                        <View style={styles.cardContainer}>
                            <Text style={styles.textTitle}>{product.title}</Text>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: product.images[0] }}
                                    style={styles.image}
                                    resizeMode='contain'
                                />

                            </View>
                            <View style={styles.texContainer}>
                                <Text style={styles.textBrand}>{product.brand}</Text>
                                <Text style={styles.textNormalPrice2}>${product.normalPrice}</Text>
                            </View>
                        </View>

                        <View style={styles.buttonConatiner}>
                            <Button title='Añadir'></Button>
                            <Button onPress={() => setProductSelected("")} title="Volver" />
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={styles.titleDescription}>Descripción:</Text>
                            <Text style={styles.textDescription}>{product.description}</Text>
                        </View>
                    </View>

                ) : null}
        </ScrollView >
    )
}

export default ItemDetail

const styles = StyleSheet.create({
    main: {
        width: '100%',
        backgroundColor: colors.white,
        flex: 1
    },

    mainContainer: {
        gap: 10,
    },
    cardContainer: {
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 10,
        gap: 5,
        width: '100%'
    },
    textTitle: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 17,
        textAlign: 'justify',
    },
    imageContainer: {
        height: 300,
        width: 300,
        backgroundColor: colors.white,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    texContainer: {
        width: '100%',
        backgroundColor: colors.white,
    },
    textBrand: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 18,
    },
    offerPriceAndDiscountPercentageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    textOfferPrice: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 18,

    },
    textDiscountPercentage: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 18,
        color: colors.green3,
    },
    textNormalPrice: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 18,
        color: colors.gray2,
        textDecorationLine: 'line-through'
    },
    textNormalPrice2: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 18,
    },
    buttonConatiner: {
        gap: 10,
        padding: 10,
        backgroundColor: colors.white,
    },

    descriptionContainer: {
        backgroundColor: colors.white,
        padding: 10
    },
    titleDescription: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 16,
    },
    textDescription: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 16,
        textAlign: 'justify',
    },
})