import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import AddButton from '../components/AddButton'
import { useGetLocationQuery } from '../services/shopService'
import AddressItem from '../components/AddressItem'
import ListAddressLayout from '../components/darkModeLayout/ListAddressLayout'
import { colors } from '../constants/colors'
import { Feather } from '@expo/vector-icons';

const ListAddress = ({ navigation }) => {
    //Dark Mode
    //Constante que almacena el valor global de darkMode desde Redux.
    const isDark = useSelector(state => state.global.value.darkMode)
    //Constante para manejar el color de los textos, segun si isDark es True o False.
    const textColor = isDark ? colors.dark6 : colors.black

    //Constante que almacena el Id del usuario logeado desde Redux.
    const { localId } = useSelector((state) => state.auth.value)
    //useGetLocationQuery(localId) obtiene la información de la ubicación del usuario desde RTDataBase.
    const { data: location, isLoading, isError } = useGetLocationQuery(localId)

    return (
        <>
            {!isLoading && !isError && location ? (
                <ListAddressLayout>
                    <View style={styles.container}>
                        <AddressItem
                            location={location}
                            navigation={navigation}
                        />
                        <AddButton
                            title='Volver'
                            onPress={() => navigation.navigate('My Profile Stack')}
                        />
                    </View>
                </ListAddressLayout>
            ) : !isLoading && !isError && !location ? (
                <ListAddressLayout>
                    <View style={styles.container}>
                        <Text style={{ ...styles.text, color: textColor }}>No se ha establecido una ubicación</Text>
                        <AddButton
                            title='Seleccionar localización'
                            onPress={() => navigation.navigate('Location Selector')}
                        />
                        <AddButton
                            title='Volver'
                            onPress={() => navigation.navigate('My Profile Stack')}
                        />
                    </View>
                </ListAddressLayout>
            ) : !isError && !location && isLoading ? (
                <View style={styles.loaderContainer}>
                    <Feather name="loader" size={24} color={isDark ? 'white' : 'black'} />
                </View>
            ) : !location && !isLoading && isError ? (
                <ListAddressLayout>
                    <View style={styles.container}>
                        <Text style={{ ...styles.text, color: textColor }}>Ha ocurrido un error al obtener la ubicación desde nuestro servidor</Text>
                        <AddButton
                            title='Seleccionar localización'
                            onPress={() => navigation.navigate('Location Selector')}
                        />
                        <AddButton
                            title='Volver'
                            onPress={() => navigation.navigate('My Profile Stack')}
                        />
                    </View>
                </ListAddressLayout>
            ) : null}
        </>
    )
}

export default ListAddress

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15,
        gap: 15
    },
    text: {
        paddingVertical: 20,
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 18,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})