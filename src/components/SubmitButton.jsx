import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

//Un boton personalizado, que recibe un titulo y una función.
const SubmitButton = ({ onPress, title }) => {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

export default SubmitButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green1,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        width: '50%'
    },
    text: {
        color: colors.white,
        fontFamily: 'OpenSans_SemiCondensed-SemiBold',
        fontSize: 20
    }
})