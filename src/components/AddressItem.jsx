import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useDeleteLocationMutation } from '../services/shopService';
import Toast from 'react-native-toast-message';
import ModalCustom from './ModalCustom';

const AddressItem = ({ location, navigation }) => {
    //DarkMode
    //Constante que almacena el valor global de darkMode desde Redux.
    const isDark = useSelector(state => state.global.value.darkMode)
    //Constante para manejar el color de los textos, segun si isDark es True o False.
    const textColor = isDark ? colors.dark6 : colors.black
    //Constante para manejar el backgroundColor del componente 'AddressItem', segun si isDark es True o False.
    const backgroundColor = isDark ? colors.dark1 : colors.white
    //Constante para manejar el color de los bordes del componente AddressItem, segun si isDark es True o False.
    const borderColor = isDark ? colors.green1 : colors.green2

    //Constante que almacena el localId del usuario desde Redux.
    const { localId } = useSelector((state) => state.auth.value)
    //Mutación que permite eliminar la información de la ubicación y dirección del usuario en RTDataBase.
    const [triggerDeleteLocation, result] = useDeleteLocationMutation()
    //Constante para manejar la visibilidad del ModalCustom que elimina la ubicación del usuario.
    const [modalDeleteLocationVisible, setModalDeleteLocationVisible] = useState(false)
    //Constante para manejar la visibilidad del ModalCustom que cambia la ubicación del usuario.
    const [modalChangeLocationVisible, setModalChangeLocationVisible] = useState(false)

    //onChangeLocation
    //Esta función se ejecuta cuando el usuario presiona el boton confirmar del Modal que pregunta si: ¿Desas cambiar la ubicación?.
    const onChangeLocation = () => {
        //Envia al usuario al screen Location Selector, para actualizar la ubicación.
        navigation.navigate('Location Selector')
        //luego establece la visibilidad del modal en false.
        setModalChangeLocationVisible(false)
    }

    //handleCancelModalChangeLocation
    //Esta función se ejecuta cuando el usuario presiona el boton cancelar del modal que preguna si: ¿Desas cambiar la ubicación?.
    const handleCancelModalChangeLocation = () => {
        //establece la visibilidad del modal en false.
        setModalChangeLocationVisible(false)
    }

    //deleteLocation
    //Esta función se ejecuta cuando el usuario presiona el boton eliminar del modal que pregunta si: ¿Deseas eliminar la dirección?.
    const deleteLocation = () => {
        //Elimina la información de la ubicación y dirección del usuario en RTDataBase.
        triggerDeleteLocation(localId)
        //luego establece la visibilidad del modal en false.
        setModalDeleteLocationVisible(false)
    }

    //handleCancelModalDeleteLocation 
    //Esta funcion se ejecuta cuando el usuario presiona el boton cancelar del modal que pregunta si: ¿Deseas eliminar la dirección?.
    const handleCancelModalDeleteLocation = () => {
        //establece la visibilidad del modal en false.
        setModalDeleteLocationVisible(false)
    }
    
    //UseEffect para manejar el error de triggerDeleteLocation(localId)
    useEffect(() => {
        //Si el proceso de eliminar la ubicacion y dirección del usuario en RTDataBase se realiza exitosamente, se mostrará 
        //una toast de tipo succes al usuario.
        if (result.isSuccess) {
            Toast.show({
                type: 'success',
                text1: 'Dirección Eliminada',
                text2: 'La información de la ubicación se ha eliminado exitosamente.',
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
        } //Si el proceso de eliminar los datos de ubicación del usuario arroja algun error desde el servidor RTDataBase, se mostrará una toast
        //de tipo error.
        else if (result.isError) {
            //Constante que almacena el mensaje de error proveniente desde el servidor de RTDataBase.
            const errorMessage = result.error?.data?.error?.message;
            //Dado que no se sabe el mensaje de error que devolverá el servidor cuando ocurrá un error, se mostrará un mensaje de error generico
            // al usuario. Para posteriormente revisar el error a traves de la constane errorMessage.
            Toast.show({
                type: 'error',
                text1: 'Error al eliminar la ubicación',
                text2: 'Ha ocurrido un error al intentar eliminar la información de la ubicación. Por favor, inténtelo nuevamente más tarde.',
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
    }, [result])

    return (
        <View style={{ ...styles.card, backgroundColor, borderColor }}>
            <Entypo name="location" size={20} color="red"></Entypo>
            <View style={styles.textContainer}>
                <Text style={{ ...styles.text, color: textColor }}>
                    {location.address}
                </Text>
            </View>
            <Pressable onPress={() => setModalChangeLocationVisible(true)}>
                <MaterialIcons name="change-circle" size={24} color={textColor} />
            </Pressable>
            <Pressable onPress={() => setModalDeleteLocationVisible(true)}>
                <Ionicons name="trash" size={24} color={textColor} />
            </Pressable>
            <ModalCustom
                modalVisible={modalDeleteLocationVisible}
                text1={'¿Deseas eliminar la dirección?'}
                text2={location.address}
                titleButtonLeft='Eliminar'
                onPressButtonLeft={deleteLocation}
                titleButtonRight='Cancelar'
                onPressButtonRight={handleCancelModalDeleteLocation}
            />
            <ModalCustom
                modalVisible={modalChangeLocationVisible}
                text1={'¿Deseas cambiar la ubicación?'}
                text2={location.address}
                titleButtonLeft='Cambiar'
                onPressButtonLeft={onChangeLocation}
                titleButtonRight='Cancelar'
                onPressButtonRight={handleCancelModalChangeLocation}
            />
        </View>
    )
}

export default AddressItem

const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        width: '70%',
    },
    text: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 16,
        textAlign: 'justify'
    },
    text2: {
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 16,
        color: 'black',
    }
})