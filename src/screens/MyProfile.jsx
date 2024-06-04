import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import AddButton from '../components/AddButton'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopService'
import { clearUser } from '../features/User/userSlice'
import { colors } from '../constants/colors'
import MyProfileLayout from '../components/darkModeLayout/MyProfileLayout'
import Toast from 'react-native-toast-message'
import { clearCart } from '../features/Cart/cartSlice'
import { setDarkMode } from '../features/Global/globalSlice'

const MyProfile = ({ navigation }) => {

    //Se obtiene la foto de perfil del usuario en formato base64 desde el estado global de imageCamera y el estado global de su localId.
    const { imageCamera, localId } = useSelector((state) => state.auth.value)
    //Obtiene la imagen de perfil del usuario, en formato base64 desde RTDataBase y la almacena en una constante llamada imageFromBase.
    const { data: imageFromBase, isError } = useGetProfileImageQuery(localId)
    //Esta constante almacena la imagen de perfil por defecto, cuando el usario aun no ha agregado una foto.
    const defaultImageRoute = '../../assets/images/defaultProfile.png'
    const dispatch = useDispatch()

    //useEffect para el manejo de error de useGetProfileImageQuery(localId)
    //Este mensaje se mostrará al usuario, cuando no se pueda obtener la imagen de perfil desde RTDataBase.
    useEffect(() => {
        if (isError) {
            Toast.show({
                type: 'error',
                text1: 'Error al obtener la imagen de perfil',
                text2: 'Ha ocurrido un error en nuestro servidor al intentar obtener la imagen de perfil, por favor, reintente nuevamente mas tarde.',
                autoHide: true,
                visibilityTime: 6000,
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
        }
    }, [isError]);

    //launchCamera
    //Esta función se ejecuta cuando se presiona en el bóton añadir foto de perfil.
    const launchCamera = async () => {
        //Dirige al usuario hacia la pestaña ImageSelector.
        navigation.navigate('Image selector')
    }

    //signOut
    //Esta función se ejecuta cuando el usuario presiona el boton cerrar sesión.
    const signOut = async () => {
        //Se setea a null el estado globla de user y token en Redux.
        dispatch(clearUser())
        //Se restablece el array de items del carrito de compra y el total en el estado global de Redux a sus valor inicial, esto para evitar
        //que cuando inicie sesion otro usuario o se registre un nuevo usario, aparescan los productos y el total del usuario anterior.
        dispatch(clearCart())
        //Y se restablece el valor de darkMode a false, para que cuando ingrese otro usuario o se registre un nuevo usuario, no cargue la app
        //con el estado de darkMode activado.
        dispatch(setDarkMode(false))
    }

    return (
        <MyProfileLayout>
            <View style={styles.container}>
                {imageFromBase || imageCamera ? (
                    <Image
                        source={{ uri: imageFromBase?.image || imageCamera }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                ) : (
                    <Image
                        source={require(defaultImageRoute)}
                        style={styles.image}
                        resizeMode='cover'
                    />
                )}
                <AddButton onPress={launchCamera} title={imageFromBase || imageCamera ? 'Cambiar foto de perfil' : 'Añadir foto de perfil'} />
                <AddButton onPress={signOut} title='Cerrar Sesión' />
            </View>
        </MyProfileLayout>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: colors.green3,
        borderWidth: 2
    }
})