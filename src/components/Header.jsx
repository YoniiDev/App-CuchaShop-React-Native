import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import { FontAwesome } from '@expo/vector-icons';
import products from '../data/products.json'
import SwitchCustom from './SwitchCustom';
import { useDispatch } from 'react-redux';
import { setDarkMode } from '../features/Global/globalSlice';

const Header = ({ title }) => {

    const [product, setProduct] = useState({})
    const dispatch = useDispatch()
    const [isEnabled, setIsEnabled] = useState(false)

    const handleTheme = () => {
        setIsEnabled(initialValue => !initialValue)
        dispatch(setDarkMode(!isEnabled))
    }

    console.log('isEnable:', isEnabled);
    useEffect(() => {
        if (title > 0) {
            const productFound = products.find((product) => product.id === title)
            setProduct(productFound)
        }
    }, [title])

    return (
        <>
            {/* Home Header */}
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
                            setIsEnabled={handleTheme}
                        />
                    </View>

                    : title > 0 ?
                        <View style={styles.screenHeaderContainer}>
                            <Text style={styles.screensTitleText}>{product.category}</Text>
                            <SwitchCustom
                                isEnabled={isEnabled}
                                setIsEnabled={handleTheme}
                            />
                        </View>

                        :
                        // Screens Header
                        <View style={styles.screenHeaderContainer}>
                            <Text style={styles.screensTitleText}>{title}</Text>
                            <SwitchCustom
                                isEnabled={isEnabled}
                                setIsEnabled={handleTheme}
                            />
                        </View>
            }
        </>

    )
}

export default Header

const styles = StyleSheet.create({
    // Home Header
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

    // Screen Header
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