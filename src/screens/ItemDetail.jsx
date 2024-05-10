import { Alert, Pressable, ScrollView, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import allProducts from '../data/products.json'
import { colors } from '../constants/colors'
import Counter from '../components/Counter'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../features/Counter/counterSlice'

const ItemDetail = ({ route, navigation }) => {

    const { productId: idSelected } = route.params
    const [product, setProduct] = useState(null)
    const count = useSelector(state => state.counter.value)
    const [addButtonDisabled, setAddButtonDisabled] = useState(false);
    const [addButtonStyles, setAddButtonStyles] = useState(styles.addButtonActivated)
    const dispatch = useDispatch()

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
                            <View style={styles.normalPriceAndStockContainer}>
                                <Text style={styles.textNormalPrice}>${product.normalPrice}</Text>
                                <Text style={styles.textStock}>{product.stock} {product.stock === 1 || product.stock === 0 ? 'Disponible' : 'Disponibles'}</Text>
                            </View>
                        </View>
                    </View>


                    <Counter stock={product.stock} />

                    <View style={styles.buttonConatiner}>
                        <Pressable disabled={addButtonDisabled}>
                            <Text style={addButtonStyles}>AÑADIR</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Text style={styles.goBackButton}>VOLVER</Text>
                        </Pressable>
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
                            <Text style={styles.textBrand2}>{product.brand}</Text>
                            <View style={styles.texContainer2}>
                                <Text style={styles.textNormalPrice2}>${product.normalPrice}</Text>
                                <Text style={styles.textStock}>{product.stock} {product.stock === 1 || product.stock === 0 ? 'Disponible' : 'Disponibles'}</Text>
                            </View>
                        </View>

                        <Counter stock={product.stock} />

                        <View style={styles.buttonConatiner}>
                            <Pressable disabled={addButtonDisabled}>
                                <Text style={addButtonStyles}>AÑADIR</Text>
                            </Pressable>
                            <Pressable onPress={() => navigation.goBack()}>
                                <Text style={styles.goBackButton}>VOLVER</Text>
                            </Pressable>
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
    buttonConatiner: {
        gap: 10,
        padding: 10,
        backgroundColor: colors.white,
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