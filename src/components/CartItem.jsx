import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({ cartItem }) => {
    
    return (
        <>
            {cartItem.offerPrice > 0 ?
                <View style={styles.card} onPress={() => { }}>
                    <View style={styles.imageContainer}>
                        <Image
                            resizeMode='contain'
                            style={styles.image}
                            source={{ uri: cartItem.images[0] }}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">{cartItem.title}</Text>
                        <Text style={styles.brandText}>{cartItem.brand}</Text>
                        <View style={styles.pricesInformationContainer}>
                            <View style={styles.discountPercentageAndQuantityContainer}>
                                <Text style={styles.textDiscountPercentage}>{cartItem.discountPercentage * 100}% OFF</Text>
                                <Text style={styles.quantityText}>Cantidad: {cartItem.quantity}</Text>
                            </View>
                            <View style={styles.normalPriceAndOfferPriceContainer}>
                                <Text style={styles.normalPriceText}>${cartItem.normalPrice}</Text>
                                <Text style={styles.offerPriceText}>${cartItem.offerPrice}</Text>
                            </View>
                        </View>
                    </View>
                    <Ionicons name="trash" size={24} color="black" />
                </View>
                :
                <View style={styles.card} onPress={() => { }}>
                    <View style={styles.imageContainer}>
                        <Image
                            resizeMode='contain'
                            style={styles.image}
                            source={{ uri: cartItem.images[0] }}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">{cartItem.title}</Text>
                        <Text style={styles.brandText}>{cartItem.brand}</Text>
                        <View style={styles.pricesInformationContainer}>
                            <Text style={styles.quantityText}>Cantidad: {cartItem.quantity}</Text>
                            <Text style={styles.normalPriceText2}>${cartItem.normalPrice}</Text>
                        </View>
                    </View>
                    <Ionicons name="trash" size={24} color="black" />
                </View>
            }
        </>


    )
}

export default CartItem

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        padding: 10,
        borderWidth: 2,
        borderColor: colors.green3,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5
    },
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
        color: colors.green3,
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
    normalPriceText2:{
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