import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import AddButton from '../components/AddButton'
import { useSelector } from 'react-redux'
import { useGetProfileImageQuery } from '../services/shopService'
import { colors } from '../constants/colors'
import MyProfileLayout from '../components/darkModeLayout/MyProfileLayout'

const MyProfile = ({ navigation }) => {

    //Se obtiene la foto de perfil del usuario en formato base64 desde el estado global de imageCamera y el estado global de su localId.
    const { imageCamera, localId } = useSelector(state => state.auth.value)
    //Obtiene la imagen de perfil del usuario, en formato base64 desde RTDataBase y la almacena en una constante llamada imageFromBase.
    const { data: imageFromBase } = useGetProfileImageQuery(localId)
    //Esta constante almacena la imagen de perfil por defecto, cuando el usario aun no ha agregado una foto.
    const defaultImageRoute = '../../assets/images/defaultProfile.png'

    //launchCamera
    //Esta función se ejecuta cuando se presiona en el bóton añadir foto de perfil.
    const launchCamera = async () => {
        //Dirige al usuario hacia la pestaña ImageSelector.
        navigation.navigate('Image selector')
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
                <AddButton onPress={launchCamera} title='Añadir foto de perfil' />
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