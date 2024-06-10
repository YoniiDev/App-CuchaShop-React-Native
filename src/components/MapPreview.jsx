import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { googleMapsApiKey } from "../databases/googleMaps";
import { colors } from '../constants/colors';
import { useSelector } from 'react-redux';

const MapPreview = ({ location }) => {
    //DarkMode
    //Constante que almacena el valor global de darkMode desde Redux.
    const isDark = useSelector(state => state.global.value.darkMode)
    //Constante para manejar el color de los bordes del mapa.
    const borderColor = isDark ? colors.green1 : colors.green2
    //Constante que almacena la imagen del mapa con la ubicación del usuario, desde la api de google static map.
    const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=300x300&maptype=roadmap&markers=color:red%7Clabel:Me%7C${location.latitude},${location.longitude}&key=${googleMapsApiKey}`
    return (
        <View style={styles.mapPreview}>
            <Image style={{ ...styles.mapImage, borderColor }} source={{ uri: mapPreviewUrl }} resizeMode='contain' />
        </View>
    )
}

export default MapPreview

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
    },
    mapImage: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderRadius: 6
    }
})