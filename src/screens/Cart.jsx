import { Image, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartItem from '../components/CartItem.jsx'
import { colors } from '../constants/colors.js'
import CartLayout from '../components/darkModeLayout/CartLayout.jsx'
import { useSelector } from 'react-redux'

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
                        <Pressable style={styles.pressableConfirm}>
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