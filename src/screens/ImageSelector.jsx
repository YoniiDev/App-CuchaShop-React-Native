import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import * as ImagePicker from "expo-image-picker";
import * as ExpoLibrary from "expo-media-library";
import { useDispatch, useSelector } from 'react-redux'
import { setCameraImage } from '../features/User/userSlice';
import AddButton from '../components/AddButton';
import { colors } from '../constants/colors';
import { useGetProfileImageQuery, usePostProfileImageMutation } from '../services/shopService'
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
    //Constante que permite saber si la constante imagen es null o no.
    const isImageNull = image === null ? true : false
    //Constante que sirve para saber si la foto o imagen de perfil proviene desde de la cámara o la galería.
    const [isImageFromCamera, setIsImageFromCamera] = useState(false)
    //Constante que almacena la URI de la fotografía tomada con la camara del dispositivo.
    const [imageURI, setImageURI] = useState("")
    //usePostProfileImageMutation(), es la mutación que permite subir la foto de perfil del usuario al servidor de firebase.
    const [triggerPostImage, result] = usePostProfileImageMutation()
    //Se obtiene el estado goblal de localID desde Redux.
    const { localId } = useSelector((state) => state.auth.value)
    //Se obtiene la foto de perfil del usuario desde RTDataBase si es que hubiese una subida anteriormente.
    const { data: imageFromBase, isError } = useGetProfileImageQuery(localId)

    const dispatch = useDispatch()

    //verifyCameraPermissions
    //Funcion que solicita permiso al usuario para acceder a la camera del dispositivo.
    const verifyCameraPermissions = async () => {
        //Con Granted sabemos si el usuario nos otorgo el permiso o no, segun su valor (true o false),
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        return granted
    }

    //verifyGalleryPermissions
    //Funcion que solicita permiso al usuario para acceder a la galería de imagenes del dispositivo.
    const verifyGalleryPermissions = async () => {
        //Con Granted sabemos si el usuario nos otorgo el permiso o no, segun su valor (true o false),
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        return granted
    }

    //Funcion PickImage
    //Esta función se ejecuta al presionar el boton tomar una foto o el boton tomar otra fotografia.
    const pickImage = async () => {
        try {
            setIsImageFromCamera(true)
            //Solicitamos permiso al usuario para acceder a la camara del dispositivo, la respuesta es un booleano (true o false),
            //y se almacena en la constante permissionCamera.
            const permissionCamera = await verifyCameraPermissions()

            if (permissionCamera) {
                //Si el usuario nos otorga el permiso (true) de acceso a la camara, se lanza la apertura de la camara del dispositivo.
                //Importante destacar que el resultado (result) no se obtiene, hasta que el usuario recorte la foto tomada o cierre la camara o descarte
                //la fotografia tomada. 
                //Lo que la hace una funcion asincronica.
                let result = await ImagePicker.launchCameraAsync({
                    //mediaTypes nos permite escojer entre imagenes o videos, o ambos a la vez.
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    //allowsEditing es una opcion que permite activar o descativar la edicion de la imagen.
                    allowsEditing: true,
                    //aspect es la relacion de aspecto de la imagen al realizar el recorte de la fotografía, puede ser [1, 1], [9, 16], etc.
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
                    //se setea la constante image, definida al principio del componente.
                    setImage(image)
                    //y seteamos la uri de la fotografia en la constante imageURI.
                    setImageURI(result.assets[0].uri)

                } else if (result.canceled) {
                    //Si el usuario cierra la camara o descarta la foto tomada, o dicho de otra forma, el usuario no confirma el recorte de la imagen, 
                    //se muestrará el siguiete mensaje.
                    Toast.show({
                        type: 'info',
                        text1: 'Fotografía Descartada',
                        text2: 'No se ha obtenido ninguna foto desde la cámara. Si deseas, puedes intentarlo de nuevo.',
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
                //Si el usuario no otorga el permiso a la aplicación para acceder a la camara del dispositivo, se mostrará el siguiente mensaje.
                Toast.show({
                    type: 'info',
                    text1: 'Permiso de Acceso a la Cámara Denegado',
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
            //En caso de ocurrir algun error en el código del bloque try, se mostrará una tostada de error al usuario.
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

    //pickLibraryImage
    //Esta función se ejecuta cuando el usuario presiona el boton de galeria de fotos.
    const pickLibraryImage = async () => {
        try {
            setIsImageFromCamera(false)
            //Se solicita al usuario el permiso para acceder a la galería de imagenes.
            const permissionGallery = await verifyGalleryPermissions()
            if (permissionGallery) {
                //Si el permiso es concedido, se accede a la galería de imagenes del dispositivo.
                //Cabe mencionar que la constante result no se obtiene hasta que el usuaruio confirma el recorte de la imagen seleccionada
                // o hasta que cierre la galeria o descarte la foto seleccionada.
                const result = await ImagePicker.launchImageLibraryAsync({
                    base64: true,
                    allowsEditing: true,
                    aspect: [1, 1],
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.2,

                })

                if (!result.canceled) {
                    //Si el usuario confirmó el recorte de la imagen proveniente desde la galeria de fotos, esta se almacenará 
                    //en formato base64 en una constante image.
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    //y luego seteará el estado image, declarado al principio del componente.
                    setImage(image)

                } else if (result.canceled) {
                    //Si el usuario cierra la galería de fotos o descarta la imagen seleccionada, se mostrará el siguiente mensaje.
                    Toast.show({
                        type: 'info',
                        text1: 'Imagen Descartada',
                        text2: 'No se ha obtenido ninguna imagen desde la galería de fotos. Si deseas, puedes intentarlo de nuevo.',
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
            } else if (!permissionGallery) {
                //Si el usuario no otorga el permiso para acceder a la galería de imagenes, se mostrará el siguiente mensaje.
                Toast.show({
                    type: 'info',
                    text1: 'Permiso de Acceso a la Galería Denegado',
                    text2: 'No pudimos acceder a la galería de imágenes porque el permiso fue denegado. Por favor, habilita el acceso a la galería de imágenes para seleccionar una imagen de perfil.',
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
            //En caso de producirse algun error en el código dentro del bloque try, se mostrará el siguiente mensaje al usuario.
            Toast.show({
                type: 'error',
                text1: 'Error inesperado',
                text2: 'Se ha producido un error inesperado. Por favor, inténtelo de nuevo más tarde.',
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
    const confirmImage = async () => {
        try {
            //Setea el estado global de imageCamera en Redux, con la foto de perfil seleccionada por el usuario en formato base64.
            dispatch(setCameraImage(image))
            //y se trigerea la acción de almacenar la foto de perfil del usuario en formato base64, en RTDataBases.
            triggerPostImage({ image, localId })
            if (isImageFromCamera) {
                //Este result contiene información de la fotografía y esta linea de código almacena la fotografía tomada desde la camara en la
                //galeria de fotos del dispositivo.
                const result = await ExpoLibrary.createAssetAsync(imageURI)
            }

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

    //UseEfect para manejar la navegacion hacia la pestaña anterior (MyProfile) y avisar al usuario en caso de posibles errores que pueda arrojar 
    //el servidor tras la acción triggerPostImage({ image, localId }).
    //Se maneja navigation.goBack a traves de un useEffect, porque al manejarlo a traves de la función confirmImage, se desmonta el componente
    //<<ImageSelector>> antes de que la result de usePostProfileImageMutation() pase estar completada, lo cual no nos permite saber si la 
    //respuesta del servidor de firebase retorno algun error o la result se completo satisfactoriamente. De hecho, se le agrego un await a 
    //triggerPostImage({ image, localId }), para esperar la respuesta de la result, pero solo llega hasta el estado pending, luego el componente
    //<<ImageSelector>> se desmonta y no alcanza a mostrar por consola si la result de este proceso fue completada satisfactoriamnete o no.
    useEffect(() => {
        if (result.isSuccess) {
            //Si el proceso de mutación para cargar la imagen en firebase es exitoso, se vuelve a la pestaña My Profile.
            navigation.goBack()
        } else if (result.isError) {
            //Si el proceso de mutación para cargar la imagen en firebase no es exitoso, se muestra el siguiente mensaje de error al usuario.
            Toast.show({
                type: 'error',
                text1: 'Error Inesperado',
                text2: 'Hubo un problema al intentar cargar la fotografía de perfil en nuestro servidor. Por favor, inténtelo más tarde.',
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

    //useEffect para mostrar un mensaje de error al usuario en caso de que la imagen de perfil (imagenFromBase) no se haya podido descargar
    //corretamente desde RTDataBase a traves de useGetProfileImageQuery(localId).
    useEffect(() => {
        if (isError) {
            Toast.show({
                type: 'error',
                text1: 'Error al cargar imagen',
                text2: 'Ha ocurrido un problema al intentar descargar la imagen de perfil desde nuestro servidor.',
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
    }, [isError])

    const handleCancel = () => {
        //Permite al usuario volver atras en caso de que ya no quiera: tomar una fotografia con la camara, escogerla dese la galería de imagenes
        //o confirmar la nueva foto o imagen.
        navigation.goBack()
    }
    return (
        <ImageSelectorLayout>
            <View style={styles.container}>
                {image || imageFromBase ? (
                    <>
                        <Image source={{ uri: image || imageFromBase?.image }} style={styles.image} />
                        <AddButton title='Tomar otra foto' onPress={pickImage} />
                        <AddButton title='Galería de fotos' onPress={pickLibraryImage} />
                        {/* Rederizado condicional del boton <<Cofirmar Foto>> para evitar que el usuario setee en null el estado global de 
                        imageCamera en Redux y tambien para prevenir que cargue null en profileImage de RTDataBase*/}
                        {!isImageNull ? <AddButton title='Confirmar foto' onPress={confirmImage} /> : null}
                        <AddButton title='Cancelar' onPress={handleCancel} />
                    </>
                ) : (
                    <>
                        <View style={styles.noPhotoContainer}>
                            <Text style={{ ...styles.textNoPhoto, color: textColor }}>No hay foto para mostrar...</Text>
                        </View>
                        <AddButton title='Tomar una foto' onPress={pickImage} />
                        <AddButton title='Galería de fotos' onPress={pickLibraryImage} />
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