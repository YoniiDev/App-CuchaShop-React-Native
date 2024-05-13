import { Pressable, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardLayout from '../components/darkModeLayout/CardLayout'
import { colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { setIdSelected } from '../features/Shop/shopSlice'

const ProductItem = ({ product, navigation }) => {

    const dispatch = useDispatch()
    const isDark = useSelector(state => state.global.value.darkMode)
    const textColor = isDark ? colors.dark6 : colors.black
    const texColorDiscountPercentage = isDark ? colors.green1 : colors.green2
    const texColorNormalPrice = isDark ? colors.dark5 : colors.gray2
    const borderColor = isDark ? colors.green1 : colors.gray

    const handleNavigate = () => {
        dispatch(setIdSelected(product.title))
        navigation.navigate('ItemDetail', { productId: product.id })
    }

    return (
        <>
            {product.offerPrice > 0 ?
                <CardLayout style={{ ...styles.additionalStylesCard, borderColor: borderColor }}>
                    <Pressable style={styles.pressable} onPress={handleNavigate}>
                        <View style={styles.imageContainer}>
                            <Image
                                resizeMode='contain'
                                style={styles.image}
                                source={{ uri: product.images[0] }}
                            />
                        </View>
                        <View style={styles.productInformationContainer}>
                            <Text style={{ ...styles.textTitle, color: textColor }} numberOfLines={2} ellipsizeMode="tail">{product.title}</Text>
                            <View style={styles.containOfferPriceAndDiscountPercentage}>
                                <Text style={{ ...styles.textOfferPrice, color: textColor }}>${product.offerPrice}</Text>
                                <Text style={{ ...styles.textDiscountPercentage, color: texColorDiscountPercentage }}>{product.discountPercentage * 100}% OFF</Text>
                            </View>
                            <Text style={{ ...styles.textNormalPrice, color: texColorNormalPrice }}>${product.normalPrice}</Text>
                        </View>
                    </Pressable>
                </CardLayout>

                :

                <CardLayout style={{ ...styles.additionalStylesCard, borderColor: borderColor }}>
                    <Pressable style={styles.pressable} onPress={handleNavigate}>
                        <View style={styles.imageContainer}>
                            <Image
                                resizeMode='contain'
                                style={styles.image}
                                source={{ uri: product.images[0] }}
                            />
                        </View>
                        <View style={styles.productInformationContainer}>
                            <Text style={{ ...styles.textTitle, color: textColor }} numberOfLines={2} ellipsizeMode="tail">{product.title}</Text>
                            <Text style={{ ...styles.textNormalPrice2, color: textColor }}>${product.normalPrice}</Text>
                        </View>
                    </Pressable>
                </CardLayout>
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
    },
    containOfferPriceAndDiscountPercentage: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textOfferPrice: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 14,
    },
    textDiscountPercentage: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 14,
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

    }
})