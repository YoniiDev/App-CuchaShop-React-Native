import { Alert, Pressable, ScrollView, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import allProducts from '../data/products.json'
import { colors } from '../constants/colors'
import Counter from '../components/Counter'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../features/Counter/counterSlice'
import ItemDetailLayout from '../components/darkModeLayout/ItemDetailLayout'
import { setIdSelected } from '../features/Shop/shopSlice'

const ItemDetail = ({ route, navigation }) => {

    const { productId: idSelected } = route.params
    const [product, setProduct] = useState(null)
    const count = useSelector(state => state.counter.value)
    const [addButtonDisabled, setAddButtonDisabled] = useState(false);
    const [addButtonStyles, setAddButtonStyles] = useState(styles.addButtonActivated)
    const dispatch = useDispatch()

    const isDark = useSelector(state => state.global.value.darkMode)
    const textColor = isDark ? colors.dark6 : colors.black
    const texColorDiscountPercentage = isDark ? colors.green1 : colors.green2
    const texColorNormalPrice = isDark ? colors.dark5 : colors.gray2

    const overStockAlert = () =>
        Alert.alert(
            'Alerta',
            'No puedes añadir una cantidad que supere el stock disponible.',
            [
                { text: 'OK' },
            ]);

    useEffect(() => {
        const productSelected = allProducts.find((product) => product.id === idSelected)
        setProduct(productSelected)


        if (product !== null && count > product.stock) {
            overStockAlert()
            dispatch(reset())
            setAddButtonDisabled(true)
            setAddButtonStyles(styles.addButtonDisabled)

        } else {
            setAddButtonDisabled(false)
            setAddButtonStyles(styles.addButtonActivated)
        }
    }, [idSelected, count])

    const handleGoBack = () => {
        dispatch(setIdSelected(''))
        navigation.goBack()
    }

    return (
        <ScrollView style={styles.main}>
            <ItemDetailLayout>
                {product && product.offerPrice > 0 ? (
                    <View style={styles.mainContainer}>
                        <View style={styles.cardContainer}>
                            <Text style={{ ...styles.textTitle, color: textColor }}>{product.title}</Text>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: product.images[0] }}
                                    style={styles.image}
                                    resizeMode='contain'
                                />

                            </View>
                            <View style={styles.texContainer}>
                                <Text style={{ ...styles.textBrand, color: textColor }}>{product.brand}</Text>
                                <View style={styles.offerPriceAndDiscountPercentageContainer}>
                                    <Text style={{ ...styles.textOfferPrice, color: textColor }}>${product.offerPrice}</Text>
                                    <Text style={{ ...styles.textDiscountPercentage, color: texColorDiscountPercentage }}>{product.discountPercentage * 100}% OFF</Text>
                                </View>
                                <View style={styles.normalPriceAndStockContainer}>
                                    <Text style={{ ...styles.textNormalPrice, color: texColorNormalPrice }}>${product.normalPrice}</Text>
                                    <Text style={{ ...styles.textStock, color: textColor }}>{product.stock} {product.stock === 1 || product.stock === 0 ? 'Disponible' : 'Disponibles'}</Text>
                                </View>
                            </View>
                        </View>


                        <Counter stock={product.stock} />

                        <View style={styles.buttonContainer}>
                            <Pressable disabled={addButtonDisabled}>
                                <Text style={addButtonStyles}>AÑADIR</Text>
                            </Pressable>
                            <Pressable onPress={handleGoBack}>
                                <Text style={styles.goBackButton}>VOLVER</Text>
                            </Pressable>
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={{ ...styles.titleDescription, color: textColor }}>Descripción:</Text>
                            <Text style={{ ...styles.textDescription, color: textColor }}>{product.description}</Text>
                        </View>
                    </View>
                )
                    :
                    product && product.offerPrice === 0 ? (
                        <View style={styles.mainContainer}>
                            <View style={styles.cardContainer}>
                                <Text style={{ ...styles.textTitle, color: textColor }}>{product.title}</Text>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: product.images[0] }}
                                        style={styles.image}
                                        resizeMode='contain'
                                    />

                                </View>
                                <Text style={{ ...styles.textBrand2, color: textColor }}>{product.brand}</Text>
                                <View style={styles.texContainer2}>
                                    <Text style={{ ...styles.textNormalPrice2, color: textColor }}>${product.normalPrice}</Text>
                                    <Text style={{ ...styles.textStock, color: textColor }}>{product.stock} {product.stock === 1 || product.stock === 0 ? 'Disponible' : 'Disponibles'}</Text>
                                </View>
                            </View>

                            <Counter stock={product.stock} />

                            <View style={styles.buttonContainer}>
                                <Pressable disabled={addButtonDisabled}>
                                    <Text style={addButtonStyles}>AÑADIR</Text>
                                </Pressable>
                                <Pressable onPress={handleGoBack}>
                                    <Text style={styles.goBackButton}>VOLVER</Text>
                                </Pressable>
                            </View>

                            <View style={styles.descriptionContainer}>
                                <Text style={{ ...styles.titleDescription, color: textColor }}>Descripción:</Text>
                                <Text style={{ ...styles.textDescription, color: textColor }}>{product.description}</Text>
                            </View>
                        </View>

                    ) : null}
            </ItemDetailLayout>
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 15,
        width: '100%',
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
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    texContainer: {
        width: '100%',
    },
    texContainer2: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textBrand: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 18,
    },
    textBrand2: {
        width: '100%',
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
    normalPriceAndStockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    textNormalPrice: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 18,
        color: colors.gray2,
        textDecorationLine: 'line-through',
    },
    textNormalPrice2: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 18,
    },
    textStock: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 18,
    },
    buttonContainer: {
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    addButtonActivated: {
        backgroundColor: colors.green1,
        color: colors.white,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: 9,
        borderRadius: 2,
    },
    addButtonDisabled: {
        backgroundColor: colors.gray,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: 9,
        borderRadius: 2,
        color: 'black'
    },
    goBackButton: {
        backgroundColor: colors.green1,
        color: colors.white,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: 9,
        borderRadius: 2,
    },
    descriptionContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10
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