import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import SwitchCustom from './SwitchCustom';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../features/Global/globalSlice';

const Header = ({ title }) => {

    const dispatch = useDispatch()

    //DarkMode
    //Constante que almacena el estado global de DarkMode.
    const darkMode = useSelector(state => state.global.value.darkMode)
    //Constante para manejar el estado de DarkMode
    const [isEnabled, setIsEnabled] = useState(darkMode)

    //Funcion para cambiar el estado global de darkMode a true o false.
    const handleTheme = () => {
        dispatch(setDarkMode(!darkMode))
    }

    useEffect(() => {
        //Setea la constante isEnable con el nuevo valor de darkMode cada vez que cambia su estado global.
        setIsEnabled(darkMode)
    }, [darkMode])


    return (
        <>
            {
                title === 'CuchaShop' ?
                    <View style={styles.headerContainer}>
                        <View style={styles.brandAndLogoContainer}>
                            <Text style={styles.textTitle}>{title}</Text>
                            <Image
                                style={styles.logo}
                                resizeMode='cover'
                                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cuchashop-3cceb.appspot.com/o/dog.png?alt=media&token=f8eaad94-a171-4b9f-b01f-e5f52d5b6fca' }}
                            />
                        </View>
                        <SwitchCustom
                            isEnabled={isEnabled}
                            handleTheme={handleTheme}
                        />
                    </View>
                    :
                    <View style={styles.screenHeaderContainer}>
                        <Text style={styles.screensTitleText}>{title}</Text>
                        <SwitchCustom
                            isEnabled={isEnabled}
                            handleTheme={handleTheme}
                        />
                    </View>
            }
        </>

    )
}

export default Header

const styles = StyleSheet.create({
    
    headerContainer: {
        width: '100%',
        height: 44,
        backgroundColor: colors.green3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8
    },
    brandAndLogoContainer: {
        flexDirection: 'row',
    },
    textTitle: {
        fontFamily: 'OpenSans_SemiCondensed-ExtraBold',
        color: colors.white,
        fontSize: 24,
    },

    logo: {
        height: 35,
        width: 35,
    },

    screenHeaderContainer: {
        width: '100%',
        height: 44,
        backgroundColor: colors.green3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
    },

    screensTitleText: {
        fontFamily: 'OpenSans_SemiCondensed-SemiBold',
        color: colors.white,
        fontSize: 20,
    },


})