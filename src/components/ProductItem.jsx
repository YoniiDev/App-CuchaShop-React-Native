import { Pressable, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './Card'
import { colors } from '../constants/colors'

const ProductItem = ({ product, setItemIdSelected = () => { } }) => {

    return (
        <>
            {product.offerPrice > 0 ?
                <Card style={styles.additionalStylesCard}>
                    <Pressable style={styles.pressable} onPress={() => setItemIdSelected(product.id)}>
                        <View style={styles.imageContainer}>
                            <Image
                                resizeMode='contain'
                                style={styles.image}
                                source={{ uri: product.images[0] }}
                            />
                        </View>
                        <View style={styles.productInformationContainer}>
                            <Text style={styles.textTitle} numberOfLines={2} ellipsizeMode="tail">{product.title}</Text>
                            <View style={styles.containOfferPriceAndDiscountPercentage}>
                                <Text style={styles.textOfferPrice}>${product.offerPrice}</Text>
                                <Text style={styles.textDiscountPercentage}>{product.discountPercentage * 100}% OFF</Text>
                            </View>
                            <Text style={styles.textNormalPrice}>${product.normalPrice}</Text>
                        </View>
                    </Pressable>
                </Card>

                :

                <Card style={styles.additionalStylesCard}>
                    <Pressable style={styles.pressable} onPress={() => setItemIdSelected(product.id)}>
                        <View style={styles.imageContainer}>
                            <Image
                                resizeMode='contain'
                                style={styles.image}
                                source={{ uri: product.images[0] }}
                            />
                        </View>
                        <View style={styles.productInformationContainer}>
                            <Text style={styles.textTitle} numberOfLines={2} ellipsizeMode="tail">{product.title}</Text>
                            <Text style={styles.textNormalPrice2}>${product.normalPrice}</Text>
                        </View>
                    </Pressable>
                </Card>
            }
        </>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    additionalStylesCard: {
        borderColor: colors.gray,
        borderWidth: 2,
        borderRadius: 4,
        margin: 2

    },
    pressable: {

    },
    imageContainer: {
        width: '100%',
        height: 170,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'blue'
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 8
    },
    productInformationContainer: {
        padding: 4
    },
    textTitle: {
        fontFamily: 'OpenSans_Condensed-Regular',
        fontSize: 14,
        color: colors.black,
        borderWidth: 1,
        borderColor: 'red'
    },
    containOfferPriceAndDiscountPercentage: {
        borderWidth: 1,
        borderColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textOfferPrice: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 14,
        color: colors.black,
        borderWidth: 1,
        borderColor: 'red'
    },
    textDiscountPercentage: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 14,
        color: colors.green3,
        borderWidth: 1,
        borderColor: 'red'
    },
    textNormalPrice: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 14,
        color: colors.gray2,
        borderWidth: 1,
        borderColor: 'red',
        textDecorationLine: 'line-through'
    },
    textNormalPrice2: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 14,
        color: colors.black,
        borderWidth: 1,
        borderColor: 'red',
    }
})