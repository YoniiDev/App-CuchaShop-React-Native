import { Image, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CartItem from '../components/CartItem.jsx'
import { colors } from '../constants/colors.js'
import CartLayout from '../components/darkModeLayout/CartLayout.jsx'
import { useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/shopService.js'
import Toast from 'react-native-toast-message';

const Cart = ({ navigation }) => {

    //DarkMode
    //Constante que almacena el valor global de DarkMode.
    const isDark = useSelector(state => state.global.value.darkMode)
    //Constante para manejar el color del texto en Dark Mode y en Light Mode.
    const textColor = isDark ? colors.dark6 : colors.black
    //Constante para manejar el color de los bordes en DarK Mode y en Light Mode.
    const borderColor = isDark ? colors.green1 : colors.green2
    //Constante para manejar el color de fondo del contenedor del boton confirmar y del total.
    const backgroundColorConfirmAndTotalContainer = isDark ? colors.dark1 : colors.white

    //Se obtiene la información del array de items del carrito y el valor total.
    const { items: CartData, total } = useSelector(state => state.cart.value)
    //Un servicio de shopService que nos permite trigerear la orden de compra a RTDataBase y a la vez nos provee información sobre el servicio 
    //utilizado a traves de result.
    const [triggerPostOrder, result] = usePostOrderMutation()

    const onConfirmOrder = () => {
        //Genera una orden de compra en RTDataBase.
        triggerPostOrder({
            items: CartData,
            user: 'Carlos',
            total
        })
    }


    useEffect(() => {
        if (result.isSuccess) {
            //Muestra una tostada al usuario cuando la orden de compra se genera exitosamente.
            Toast.show({
                type: 'success',
                text1: 'Orden de compra generada',
                text2: 'Tu orden de compra se ha generado exitosamente. ¡Gracias por tu compra!',
                autoHide: true,
                visibilityTime: 6000,
                topOffset: 50,
                text1Style: {
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                text2Style: {
                    fontSize: 14,
                    color: 'black',
                },
            });
        } else if (result.isError) {
            //Muestra un mensaje de error al usuario en caso de que hubiera algun error al generar la orden.
            Toast.show({
                type: 'error',
                text1: 'Error Inesperado',
                text2: 'Ha ocurrido un error inesperado. Por favor, intente más tarde.',
                autoHide: true,
                visibilityTime: 6000,
                topOffset: 50,
                text1Style: {
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                text2Style: {
                    fontSize: 14,
                    color: 'black',
                },
            });
        }
    }, [result])

    return (
        <>
            {CartData.length === 0 ?
                <CartLayout style={{ alignItems: 'center', padding: 20, gap: 20 }}>
                    <View style={styles.emptyCartImageContainer}>
                        <Image
                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cuchashop-3cceb.appspot.com/o/emptycart.png?alt=media&token=8cf3f018-c710-487f-97fc-8367ecbf51d1' }}
                            resizeMode='contain'
                            style={styles.emtyCartImage}
                        />
                    </View>
                    <Text style={{ ...styles.textEmptyCart, color: textColor }}>Tu carrito de compras está vacío. Por favor, agrega algunos productos antes de proceder.</Text>
                </CartLayout>
                :
                <CartLayout>
                    <FlatList
                        style={styles.flatList}
                        data={CartData}
                        keyExtractor={cartItem => cartItem.id}
                        renderItem={({ item }) => {
                            return (
                                <CartItem
                                    cartItem={item}
                                    navigation={navigation}
                                />
                            )
                        }}
                    />
                    <View style={{ ...styles.confirmAndTotalContainer, backgroundColor: backgroundColorConfirmAndTotalContainer, borderColor: borderColor }}>
                        <Pressable style={styles.pressableConfirm} onPress={onConfirmOrder}>
                            <Text style={styles.textConfirm}>Confirmar</Text>
                        </Pressable>
                        <Text style={{ ...styles.textTotal, color: textColor }}>Total: ${total}</Text>
                    </View>
                </CartLayout >

            }

        </>

    )
}

export default Cart

const styles = StyleSheet.create({
    emptyCartImageContainer: {
        width: '90%',
        height: '50%',
    },
    emtyCartImage: {
        width: '100%',
        height: '100%',
    },
    textEmptyCart: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        textAlign: 'justify',
        fontSize: 16,
    },
    flatList: {
        padding: 10,
    },
    confirmAndTotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 10
    },
    pressableConfirm: {

    },
    textConfirm: {
        borderRadius: 4,
        backgroundColor: colors.green1,
        color: colors.white,
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    textTotal: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 16,
    },
})