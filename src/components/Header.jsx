import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ title }) => {
    const { height, width } = useWindowDimensions()
    
    return (
        <View style={styles.headerContainer}>
            <View style={styles.brandAndLogoContainer}>
                <Text style={width > 360 ? styles.textTitle : styles.textTitleSm}>{title}</Text>
                <Image
                    style={styles.logo}
                    resizeMode='cover'
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cuchashop-3cceb.appspot.com/o/dog.png?alt=media&token=f8eaad94-a171-4b9f-b01f-e5f52d5b6fca' }}
                />
            </View>
            <FontAwesome name="user-circle-o" size={34} color="white" />

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 50,
        backgroundColor: colors.green3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1
    },
    brandAndLogoContainer: {
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 1
    },
    textTitle: {
        fontFamily: 'OpenSans_SemiCondensed-ExtraBold',
        color: colors.white,
        fontSize: 24,
        // backgroundColor: 'black',
        borderColor: 'red',
        borderWidth: 1
    },
    textTitleSm: {
        fontFamily: 'OpenSans_SemiCondensed-ExtraBold',
        color: colors.white,
        fontSize: 20,
        borderColor: 'red',
        borderWidth: 1
    },
    logo: {
        height: 40,
        width: 40,
        borderColor: 'red',
        borderWidth: 1
    }

})