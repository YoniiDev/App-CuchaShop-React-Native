import { Pressable, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { Ionicons } from '@expo/vector-icons';
import CartItemLayout from './darkModeLayout/CarItemLayout.';
import { useSelector } from 'react-redux';

const CartItem = ({ cartItem, navigation }) => {

    //DarKMode
    //Constante que almacena el valor global de darkMode.
    const isDark = useSelector(state => state.global.value.darkMode)
    //Constante para manejar el color de los textos en Dark Mode y Light Mode.
    const textColor = isDark ? colors.dark6 : colors.black
    //Constante para manejar el color del percentaje de descuento en Dark Mode y Light Mode.
    const texColorDiscountPercentage = isDark ? colors.green1 : colors.green2
    //Constante para manejar el color del precio normal en Dark Mode y Light Mode.
    const texColorNormalPrice = isDark ? colors.dark5 : colors.gray2

    //handleNavigate
    //Direcciona al usuario al detalle del producto que se encuentra en el carrito.
    const handleNavigate = () => {
        navigation.navigate('ProductDetail', { cartItem })
    }

    return (
        <>
            {cartItem.offerPrice > 0 ?
                <Pressable onPress={handleNavigate}>
                    <CartItemLayout onPress={() => { }}>
                        <View style={styles.imageContainer}>
                            <Image
                                resizeMode='contain'
                                style={styles.image}
                                source={{ uri: cartItem.images[0] }}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{ ...styles.titleText, color: textColor }} numberOfLines={1} ellipsizeMode="tail">{cartItem.title}</Text>
                            <Text style={{ ...styles.brandText, color: textColor }}>{cartItem.brand}</Text>
                            <View style={styles.pricesInformationContainer}>
                                <View style={styles.discountPercentageAndQuantityContainer}>
                                    <Text style={{ ...styles.textDiscountPercentage, color: texColorDiscountPercentage }}>{cartItem.discountPercentage * 100}% OFF</Text>
                                    <Text style={{ ...styles.quantityText, color: textColor }}>Cantidad: {cartItem.quantity}</Text>
                                </View>
                                <View style={styles.normalPriceAndOfferPriceContainer}>
                                    <Text style={{ ...styles.normalPriceText, color: texColorNormalPrice }}>${cartItem.normalPrice}</Text>
                                    <Text style={{ ...styles.offerPriceText, color: textColor }}>${cartItem.offerPrice}</Text>
                                </View>
                            </View>
                        </View>
                        <Ionicons name="trash" size={24} color={textColor} />
                    </CartItemLayout>
                </Pressable>
                :
                <Pressable onPress={handleNavigate}>
                    <CartItemLayout onPress={() => { }}>
                        <View style={styles.imageContainer}>
                            <Image
                                resizeMode='contain'
                                style={styles.image}
                                source={{ uri: cartItem.images[0] }}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={{ ...styles.titleText, color: textColor }} numberOfLines={1} ellipsizeMode="tail">{cartItem.title}</Text>
                            <Text style={{ ...styles.brandText, color: textColor }}>{cartItem.brand}</Text>
                            <View style={styles.pricesInformationContainer}>
                                <Text style={{ ...styles.quantityText, color: textColor }}>Cantidad: {cartItem.quantity}</Text>
                                <Text style={{ ...styles.normalPriceText2, color: textColor }}>${cartItem.normalPrice}</Text>
                            </View>
                        </View>
                        <Ionicons name="trash" size={24} color={textColor} />
                    </CartItemLayout>
                </Pressable>
            }
        </>


    )
}

export default CartItem

const styles = StyleSheet.create({

    imageContainer: {
        width: 80,
        height: 80,
        backgroundColor: colors.white,
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    textContainer: {
        width: '65%',
    },
    titleText: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        textAlign: 'justify',
        fontSize: 14
    },
    brandText: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 14,
        textAlign: 'left'
    },
    pricesInformationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    discountPercentageAndQuantityContainer: {

    },
    textDiscountPercentage: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 14,
        textAlign: 'left'
    },
    quantityText: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 14,
        textAlign: 'left'
    },
    normalPriceAndOfferPriceContainer: {

    },
    normalPriceText: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 14,
        color: colors.gray2,
        textDecorationLine: 'line-through',
        textAlign: 'right'
    },
    normalPriceText2: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 14,
        color: colors.black,
    },
    offerPriceText: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 14,
        color: colors.black,
    },
})