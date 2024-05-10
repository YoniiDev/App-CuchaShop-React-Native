import { Pressable, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './Card'
import { colors } from '../constants/colors'
import { useDispatch } from 'react-redux'
import { setIdSelected } from '../features/Shop/shopSlice'

const ProductItem = ({ product, navigation }) => {

    const dispatch = useDispatch()

    const handleNavigate = () => {
        dispatch(setIdSelected(product.title))
        navigation.navigate('ItemDetail', { productId: product.id })
    }

    return (
        <>
            {product.offerPrice > 0 ?
                <Card style={styles.additionalStylesCard}>
                    <Pressable style={styles.pressable} onPress={handleNavigate}>
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
                    <Pressable style={styles.pressable} onPress={handleNavigate}>
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
        borderWidth: 1,
        borderRadius: 6,
        margin: 2

    },
    pressable: {

    },
    imageContainer: {
        width: '100%',
        height: 170,
        backgroundColor: 'white',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    image: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    productInformationContainer: {
        padding: 4,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,

    },
    textTitle: {
        fontFamily: 'OpenSans_Condensed-Regular',
        fontSize: 14,
        color: colors.black,
    },
    containOfferPriceAndDiscountPercentage: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textOfferPrice: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 14,
        color: colors.black,
    },
    textDiscountPercentage: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 14,
        color: colors.green3,
    },
    textNormalPrice: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 14,
        color: colors.gray2,
        textDecorationLine: 'line-through'
    },
    textNormalPrice2: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 14,
        color: colors.black,
    }
})