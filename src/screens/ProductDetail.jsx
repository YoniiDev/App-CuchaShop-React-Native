import { Alert, Pressable, ScrollView, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import Counter from '../components/Counter'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../features/Counter/counterSlice'
import ProductDetailLayout from '../components/darkModeLayout/ProducDetailLayout'


const ProductDetail = ({ route, navigation }) => {
    
    //Constante que almacena el producto del carrito seleccionado.
    const { cartItem } = route.params
    //Constante que almacena el valor global del contador
    const count = useSelector(state => state.counter.value)
    //Constante que maneja el estado de disable, para activar o desactivar el boton
    const [addButtonDisabled, setAddButtonDisabled] = useState(false);
    //Constante para manejar los estilos aplicados al addButton, segun si esta activado o desactivado.
    const [addButtonStyles, setAddButtonStyles] = useState(styles.addButtonActivated)
    const dispatch = useDispatch()

    //DarkMode
    //Constante que almacena el estado global de darkMode
    const isDark = useSelector(state => state.global.value.darkMode)
    //Constante para manejar el color aplicado a los textos segun si darkMode es true o false.
    const textColor = isDark ? colors.dark6 : colors.black
    //Constante para manejar el color del porcentaje de descuento segun si darkMode es true o false.
    const texColorDiscountPercentage = isDark ? colors.green1 : colors.green2
    //Constante para manejar el color del precio normal segun si darkMode es true o false.
    const texColorNormalPrice = isDark ? colors.dark5 : colors.gray2

    //Alert
    //Es una alerta que avisa al usuario que la cantidad a agregada supera el stock disponible.
    const overStockAlert = () =>
        Alert.alert(
            'Alerta',
            'No puedes añadir una cantidad que supere el stock disponible.',
            [
                { text: 'OK' },
            ]);


    useEffect(() => {
       
        if (cartItem !== null && count > cartItem.stock) {
            //Alerta al usuario que supero el stock.
            overStockAlert()
            //Resetea el contador 0.
            dispatch(reset())
            //Desactiva el boton AÑADIR
            setAddButtonDisabled(true)
            //Aplica al boton AÑADIR el estilo addButtonDisabled
            setAddButtonStyles(styles.addButtonDisabled)

        } else {
            //Si no supera el stock el boton AÑADIR se mantiene activado.
            setAddButtonDisabled(false)
            //Y se mantiene el estilo addButtonActivated
            setAddButtonStyles(styles.addButtonActivated)
        }

    }, [cartItem, count])

    //HandleGoBack 
    //Es una función para volver a la pantalla anterior.
    const handleGoBack = () => {
        navigation.goBack()
    }

    return (
        <ScrollView style={styles.main}>
            {cartItem && cartItem.offerPrice > 0 ? (
                <ProductDetailLayout>
                    <View style={styles.mainContainer}>
                        <View style={styles.cardContainer}>
                            <Text style={{ ...styles.textTitle, color: textColor }}>{cartItem.title}</Text>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: cartItem.images[0] }}
                                    style={styles.image}
                                    resizeMode='contain'
                                />

                            </View>
                            <View style={styles.texContainer}>
                                <Text style={{ ...styles.textBrand, color: textColor }}>{cartItem.brand}</Text>
                                <View style={styles.offerPriceAndDiscountPercentageContainer}>
                                    <Text style={{ ...styles.textOfferPrice, color: textColor }}>${cartItem.offerPrice}</Text>
                                    <Text style={{ ...styles.textDiscountPercentage, color: texColorDiscountPercentage }}>{cartItem.discountPercentage * 100}% OFF</Text>
                                </View>
                                <View style={styles.normalPriceAndStockContainer}>
                                    <Text style={{ ...styles.textNormalPrice, color: texColorNormalPrice }}>${cartItem.normalPrice}</Text>
                                    <Text style={{ ...styles.textStock, color: textColor }}>{cartItem.stock} {cartItem.stock === 1 || cartItem.stock === 0 ? 'Disponible' : 'Disponibles'}</Text>
                                </View>
                            </View>
                        </View>


                        <Counter stock={cartItem.stock} quantity={cartItem.quantity}/>

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
                            <Text style={{ ...styles.textDescription, color: textColor }}>{cartItem.description}</Text>
                        </View>
                    </View>
                </ProductDetailLayout>
            )
                :
                cartItem && cartItem.offerPrice === 0 ? (
                    <ProductDetailLayout>
                        <View style={styles.mainContainer}>
                            <View style={styles.cardContainer}>
                                <Text style={{ ...styles.textTitle, color: textColor }}>{cartItem.title}</Text>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: cartItem.images[0] }}
                                        style={styles.image}
                                        resizeMode='contain'
                                    />

                                </View>
                                <Text style={{ ...styles.textBrand2, color: textColor }}>{cartItem.brand}</Text>
                                <View style={styles.texContainer2}>
                                    <Text style={{ ...styles.textNormalPrice2, color: textColor }}>${cartItem.normalPrice}</Text>
                                    <Text style={{ ...styles.textStock, color: textColor }}>{cartItem.stock} {cartItem.stock === 1 || cartItem.stock === 0 ? 'Disponible' : 'Disponibles'}</Text>
                                </View>
                            </View>

                            <Counter stock={cartItem.stock} quantity={cartItem.quantity}/>

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
                                <Text style={{ ...styles.textDescription, color: textColor }}>{cartItem.description}</Text>
                            </View>
                        </View>
                    </ProductDetailLayout>

                ) : null}

        </ScrollView >
    )
}

export default ProductDetail

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