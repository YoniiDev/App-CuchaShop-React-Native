import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location"
import AddButton from '../components/AddButton'
import MapPreview from '../components/MapPreview'
import { googleMapsApiKey } from '../databases/googleMaps'
import { colors } from '../constants/colors'
import { usePostLocationMutation } from '../services/shopService'
import { useSelector } from 'react-redux'
import LocationSelectorLayout from '../components/darkModeLayout/LocationSelectorLayout'
import Toast from 'react-native-toast-message'

const LocationSelector = ({ navigation }) => {

    //DarkMode
    //Constante que almacena el valor global de darkMode desde Redux.
    const isDark = useSelector(state => state.global.value.darkMode)
    //Constante para manejar el color de los textos, si isDark es true o false.
    const textColor = isDark ? colors.dark6 : colors.black
    //Constante para manejar el color de los bordes.
    const borderColor = isDark ? colors.green1 : colors.green2

    //Constante que almacena la latitude y la longitude en donde se encuentra ubicado el usuario.
    const [location, setLocation] = useState('')
    //Constante que almacena la dirección del usuario.
    const [address, setAddress] = useState('')
    //Un mutación que permite enviar la informacón de la ubicación y dirección del usuario a RTDataBase.
    const [triggerPostUserLocation, resultPostUserLocation] = usePostLocationMutation()
    //Constante que almacena el localId del usuario desde Redux.
    const { localId } = useSelector((state) => state.auth.value)

    useEffect(() => {
        //Función IIFE (Immediately Invoked Function Expression)
        //Es una función anonima autoinvocada.
        (async () => {
            try {
                //Se solicita permiso al usuario para acceder a la ubicación.
                let { status } = await Location.requestForegroundPermissionsAsync()

                if (status === 'granted') {
                    //Si el estatus es granted obtenemos la información de la ubicación del usuario.
                    let location = await Location.getCurrentPositionAsync({})
                    //De la información que nos provee Location.getCurrentPositionAsync({}), seateamos solo la latitud y la longitud en la 
                    //constante location, declarada al inicio del componente.
                    setLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    })
                } if (status === 'undetermined') {
                    //Si el usuario no otorgó ni denego el permiso de acceso a la ubicación del dispositivo, se muestra la siguiente tostada.
                    Toast.show({
                        type: 'info',
                        text1: 'No se ha otorgado permiso a la ubicación',
                        text2: 'Si desea obtener información de su ubicación actual, por favor, otorgue permiso para acceder a la ubicación del dispositivo.',
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

                } else if (status === 'denied') {
                    //Si el usuario denegó el permiso para acceder a la ubicación del dispositivo, se muestra la siguiente tostada.
                    Toast.show({
                        type: 'info',
                        text1: 'Permiso a la ubicación denegado',
                        text2: 'Si desea obtener la información de su ubicación actual, por favor, otorgue permiso para acceder a la ubicación del dispositivo.',
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
            } catch (error) {
                //En caso de ocurrir algun error en el proceso de obtención de la ubicacón del dispositivo se mostrara un mensaje en la 
                //siguiente tostada.
                Toast.show({
                    type: 'error',
                    text1: 'Error al obtener ubicación',
                    text2: 'Ha ocurrido un error al intentar obtener los datos de ubicación del dispositivo. Por favor, inténtelo de nuevo más tarde.',
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
        })()
    }, [])

    //Reverse geocoding
    useEffect(() => {
        //Función IIFE
        (async () => {
            try {
                if (location) {
                    //Si hay una location almacenada, generamos la url para obtener la información de la direccion del dispositivo, desde la api de google geocode.
                    const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;
                    const response = await fetch(url_reverse_geocode)
                    //data nos provee la información de la ubicación del dispositivo.
                    const data = await response.json()
                    //de la cual seteamos la información de la dirección del dispositivo en la constante Address.
                    setAddress(data.results[0].formatted_address)
                }

            } catch (error) {
                //Si hay algun error al obtener la dirección del dispositivo se mostrara un mensaje de error en la siguiente tostada.
                Toast.show({
                    type: 'error',
                    text1: 'Error al obtener la dirección',
                    text2: 'Ha ocurrido un error al intentar obtener la dirección del dispositivo. Por favor, inténtelo de nuevo más tarde.',
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

        })();

    }, [location]);

    //onConfirmAddress
    //Esta función se ejecuta cuando el usuario presiona el boton confirmar dirección.
    const onConfirmAddress = () => {
        const date = new Date()
        //Se envia la información de la ubicación y dirección del usuario a RTDataBase.
        triggerPostUserLocation({
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
                address: address,
                updatedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            },
            localId: localId
        })
    }

    //UseEffect para manejar errores del usePostLocationMutation()
    useEffect(() => {
        if (resultPostUserLocation.isSuccess) {
            //Si la información de la ubicación se guarda exitosamente en RTDataBase, se redireccionará al usuario a la screen 'List Addrress'F
            navigation.navigate('List Address')
        } else if (resultPostUserLocation.isError) {
            //En caso de haber error se mostrará el siguiente mensaje al usuario.
            Toast.show({
                type: 'error',
                text1: 'Error al guardar la ubicación',
                text2: 'Ha ocurrido un error al intentar guardar la información de la ubicación en nuestro servidor. Por favor, inténtelo de nuevo más tarde.',
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
    }, [resultPostUserLocation])

    return (
        <LocationSelectorLayout>
            <View style={styles.container}>
                <Text style={{ ...styles.textMyAddress, color: textColor }}>Mi Dirección</Text>
                {location && address ? (
                    <>
                        <Text style={{ ...styles.textLocation, color: textColor }}>
                            Lat: {location.latitude}, long: {location.longitude}.
                        </Text>
                        <MapPreview location={location} />
                        <Text style={{ ...styles.textaddress, color: textColor }}>
                            Dirección: {address}
                        </Text>
                        <AddButton
                            onPress={onConfirmAddress}
                            title='Confirmar dirección'
                        />
                        <AddButton
                            onPress={() => navigation.navigate('List Address')}
                            title='Volver'
                        />
                    </>
                ) : location && !address ? (
                    <>
                        <Text style={{ ...styles.textLocation, color: textColor }}>
                            Lat: {location.latitude}, long: {location.longitude}.
                        </Text>
                        <MapPreview location={location} />
                        <Text style={{ ...styles.textaddress, color: textColor }}>
                            No hay datos de dirección para mostrar.
                        </Text>
                        <AddButton
                            onPress={onConfirmAddress}
                            title='Confirmar dirección'
                        />
                        <AddButton
                            onPress={() => navigation.navigate('List Address')}
                            title='Volver'
                        />
                    </>
                ) : !location ?
                    (
                        <>
                            <View style={{ ...styles.noLocationContainer, borderColor }}>
                                <Text style={{ ...styles.textError, color: textColor }}>No hay datos de ubicación para mostrar.</Text>
                            </View>
                        </>
                    ) : null}
            </View>
        </LocationSelectorLayout>
    )
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 15,
        padding: 10
    },
    textMyAddress: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 20,
    },
    textLocation: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 17,
    },
    textaddress: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 16,
    },
    noLocationContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textError: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 16,
        textAlign: 'center'
    }
})