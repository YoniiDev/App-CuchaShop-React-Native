import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from 'react-redux'
import { setCameraImage } from '../features/User/userSlice';
import AddButton from '../components/AddButton';
import { colors } from '../constants/colors';
import { usePostProfileImageMutation } from '../services/shopService'
import ImageSelectorLayout from '../components/darkModeLayout/ImageSelectorLayout';
import Toast from 'react-native-toast-message';

const ImageSelector = ({ navigation }) => {

    //DarkMode
    //Constante que almacena el estado global de darkMode desde Redux.
    const isDark = useSelector(state => state.global.value.darkMode)
    //Constante para manejar el color aplicado a los textos segun si darkMode es true o false.
    const textColor = isDark ? colors.dark6 : colors.black

    //Constante que almacena la foto tomada por el usuario, en formato base64.
    const [image, setImage] = useState(null)
    //usePostProfileImageMutation(), es la mutación que permite subir la foto de perfil del usuario al servidor de firebase.
    const [triggerPostImage, result] = usePostProfileImageMutation()
    //Se obtiene el estado goblal de localID desde Redux.
    const { localId } = useSelector(state => state.auth.value)

    const dispatch = useDispatch()

    //verifyCameraPermissions
    //Funcion que solicita permiso al usuario para acceder a la camera del dispositivo.
    const verifyCameraPermissions = async () => {
        //Con Granted sabemos si el usuario nos otorgo el permiso o no, segun su valor (true o false),
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        return granted
    }

    //Funcion PickImage
    //Esta función se ejecuta al presionar el boton tomar una foto o el boton tomar otra fotografia.
    const pickImage = async () => {
        try {
            //Solicitamos permiso al usuario para acceder a la camara del dispositivo, la respuesta es un booleano (true o false),
            //y se almacena en la constante permissionCamera.
            const permissionCamera = await verifyCameraPermissions()

            if (permissionCamera) {
                //Si el usuario nos otorga el permiso (true) de acceso a la camara, se lanza la apertura de la camara del dispositivo.
                //Importante destacar que el resultado (result) no se obtiene hasta que el usuario recorte la foto o la descarte. 
                //Lo que la hace una funcion asincronica.
                let result = await ImagePicker.launchCameraAsync({
                    //mediaTypes nos permite escojer entre imagenes o videos, o ambos a la vez.
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    //allowsEditing es una opcion que permite activar o descativar la edicion de la imagen.
                    allowsEditing: true,
                    //aspect es la relacion de aspecto de la imagen, puede ser [1, 1], [9, 16], etc.
                    aspect: [1, 1],
                    //base64 es una formato de imagen, en la cual se almacena la imagen en formato de texto.
                    base64: true,
                    //quality define la calidad de la imagen. El valor de esta propiedad varia ente 0 y 1. Siendo 1 la calidad máxima.
                    quality: 0.2
                })

                if (!result.canceled) {
                    //Si la foto tomada por el usuario no fue cancelada, es decir, el usuario recorta la foto, se almacena la imagen tomada a traves 
                    //de la camara en la constante image, en formato base64.
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    //y se setea la constante image, definida al principio.
                    setImage(image)

                } else if (result.canceled) {
                    //Si la foto fue descartada por el usuario, o dicho de otra forma, el usuario no pasa la etapa del recorte de la imagen, 
                    //se muestra una tostada que indica al usuario que la imagen fue descartada.
                    Toast.show({
                        type: 'info',
                        text1: 'Fotografia Descartada',
                        text2: 'La foto tomada ha sido descartada. Si deseas, puedes intentarlo de nuevo.',
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
            } else if (!permissionCamera) {
                Toast.show({
                    type: 'info',
                    text1: 'Permiso de Cámara Denegado',
                    text2: 'No pudimos acceder a la cámara porque el permiso fue denegado. Por favor, habilita el acceso a la cámara para tomar fotos.',
                    autoHide: true,
                    visibilityTime: 10000,
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
        } catch (error) {
            //En caso de ocurrir algun error durante el proceso de try, se mostrará un tostada de error al usuario.
            Toast.show({
                type: 'error',
                text1: 'Error inesperado',
                text2: 'Se ha producido un error inesperado al intentar tomar la fotografía. Por favor, inténtelo de nuevo más tarde.',
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
    }
    
    //confirmImage
    //Esta función se ejecuta cuando se presiona el boton confirmar foto.
    const confirmImage = () => {
        try {
            //Setea el estado global de imageCamera en Redux, con la foto de perfil del usuario en formato base64.
            dispatch(setCameraImage(image))
            //Se trigerea la acción de almacenar la foto de perfil del usuario en formato base64, en RTDataBases.
            triggerPostImage({ image, localId })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error inesperado',
                text2: 'Ha ocurrido un error inesperado al intentar cargar la fotografía en nuestro sistema, por favor, intente mas tarde.',
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
    }

    //UseEfect para manejar la navegacion hacia la pestaña anterior (MyProfile)
    useEffect(() => {
        if (result.isSuccess) {
            //Si el proceso de mutación para cargar la imagen en firebase es exitoso, se vuelve a la pestaña My Profile.
            navigation.goBack()
        } else if (result.isError) {
            //Si el proceso de mutación para cargar la imagen en firebase no es exitoso, se muestra el siguiente mensaje de error al usuario.
            Toast.show({
                type: 'error',
                text1: 'Error Inesperado',
                text2: 'Hubo un problema al intentar cargar la fotografía en nuestra base de datos. Por favor, inténtelo más tarde.',
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
    }, [result, navigation])

    const handleCancel = () => {
        //Permite al usuario volver atras en caso de que ya no quiera tomar o confirmar la foto.
        navigation.goBack()
    }
    return (
        <ImageSelectorLayout>
            <View style={styles.container}>
                {image ? (
                    <>
                        <Image source={{ uri: image }} style={styles.image} />
                        <AddButton title='Tomar otra foto' onPress={pickImage} />
                        <AddButton title='Confirmar foto' onPress={confirmImage} />
                        <AddButton title='Cancelar' onPress={handleCancel} />
                    </>
                ) : (
                    <>
                        <View style={styles.noPhotoContainer}>
                            <Text style={{ ...styles.textNoPhoto, color: textColor }}>No hay foto para mostrar...</Text>
                        </View>
                        <AddButton title='Tomar una foto' onPress={pickImage} />
                        <AddButton title='Cancelar' onPress={handleCancel} />
                    </>
                )}
            </View>
        </ImageSelectorLayout>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
        paddingTop: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: colors.green3,
    },
    noPhotoContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: colors.green3,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textNoPhoto: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 15
    }
})