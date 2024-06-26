import { Alert, Pressable, ScrollView, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import Counter from '../components/Counter'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../features/Counter/counterSlice'
import ItemDetailLayout from '../components/darkModeLayout/ItemDetailLayout'
import { setIdSelected } from '../features/Shop/shopSlice'
import { useGetProductByIdQuery } from '../services/shopService'
import { addCartItem } from '../features/Cart/cartSlice'
import Toast from 'react-native-toast-message';

const ItemDetail = ({ route, navigation }) => {

    //Constante que almacena desde route.params el id del producto seleccionado.
    const { productId: idSelected } = route.params
    //Constante que obtiene el estado global del contador.
    const count = useSelector(state => state.counter.value)
    //Constante para manejar el estado del atributo disable del boton AÑADIR.
    const [addButtonDisabled, setAddButtonDisabled] = useState(false);
    //Constante para manejar el estilo aplicado al boton AÑADIR.
    const [addButtonStyles, setAddButtonStyles] = useState(styles.addButtonActivated)
    const dispatch = useDispatch()

    //DarKMode
    // Constante que almacena el estado global de darkMode.
    const isDark = useSelector(state => state.global.value.darkMode)
    // Constante para manejar los estilos del texto, segun si isDark es true o false.
    const textColor = isDark ? colors.dark6 : colors.black
    //Constante para manejar los estilos del porcentaje de descuento, segun si isDark es true o false.
    const textColorDiscountPercentage = isDark ? colors.green1 : colors.green2
    //Constante para manejar los estilos del precio normal, segun si isDark es true o false.
    const textColorNormalPrice = isDark ? colors.dark5 : colors.gray2

    //Se obtiene el producto por su id desde RTDataBase.
    const { data: product, error, isLoading } = useGetProductByIdQuery(idSelected)

    //Alertas
    //Mensaje que alerta al usuario cuando intenta superar en el contador, el stock de producto disponible.
    const overStockAlert = () =>
        Alert.alert(
            'Alerta',
            'No puedes añadir una cantidad que supere el stock disponible.',
            [
                { text: 'OK' },
            ]);

    //Mensaje que alerta al usuario que no puede añadir una cantidad de 0 al carrito.
    const quantityCannotBeZeroAlert = () =>
        Alert.alert(
            'Cantidad no válida',
            'No puedes añadir una cantidad de 0 al carrito. Por favor, selecciona al menos una unidad.',
            [
                { text: 'OK' },
            ]);

    useEffect(() => {

        if (!isLoading && count > product.stock) {
            //Alerta que avisa al usuario que no puede superar el stock disponible.
            overStockAlert()
            //Se resetea el contador en 0.
            dispatch(reset())
            //Se desactiva el boton AÑADIR
            setAddButtonDisabled(true)
            //Se cambia el estilo del boton AÑADIR.
            setAddButtonStyles(styles.addButtonDisabled)

        } else {
            //Se mantiene el boton añadir activado
            setAddButtonDisabled(false)
            //Y se mantiene el estilo inicial.
            setAddButtonStyles(styles.addButtonActivated)
        }
    }, [count, isLoading])

    //HandleAddCart 
    const handleAddCart = () => {
        if (count > 0) {
            //Añade un producto al carrito con su cantidad escogida por el usuario.
            dispatch(addCartItem({ ...product, quantity: count }))
            //Mensaje que avisa al usuario que el producto se añadio exitosamente al carrito.
            Toast.show({
                type: 'success',
                text1: 'Producto Añadido',
                text2: 'El producto se añadió exitosamente al carrito 🛒',
                autoHide: true,
                visibilityTime: 5000,
                topOffset: 50,
                text1Style: {
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                text2Style: {
                    fontSize: 14,
                    color: 'black'
                },
            });
        } else {
            //Alerta que avisa al usuario que la cantidad a añadir al carrito no puede ser 0.
            quantityCannotBeZeroAlert()
        }
    }

    //HandleGoBack 
    const handleGoBack = () => {
        //Setea el estado global de ItemIdSelected a string vacio.
        dispatch(setIdSelected(''))
        //Resetea el contador en 0.
        dispatch(reset())
        //Vuelve a la pantalla anterior.
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
                                    <Text style={{ ...styles.textDiscountPercentage, color: textColorDiscountPercentage }}>{product.discountPercentage * 100}% OFF</Text>
                                </View>
                                <View style={styles.normalPriceAndStockContainer}>
                                    <Text style={{ ...styles.textNormalPrice, color: textColorNormalPrice }}>${product.normalPrice}</Text>
                                    <Text style={{ ...styles.textStock, color: textColor }}>{product.stock} {product.stock === 1 || product.stock === 0 ? 'Disponible' : 'Disponibles'}</Text>
                                </View>
                            </View>
                        </View>


                        <Counter stock={product.stock} />

                        <View style={styles.buttonContainer}>
                            <Pressable disabled={addButtonDisabled} onPress={handleAddCart}>
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
                                <Pressable disabled={addButtonDisabled} onPress={handleAddCart}>
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