import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const AddButton = ({ title = '', onPress = () => { }, color = colors.green1 }) => {
    return (
        <Pressable
            style={{ ...styles.button, backgroundColor: color }}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

export default AddButton

const styles = StyleSheet.create({
    button: {
        width: '60%',
        backgroundColor: colors.green1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 10
    },
    text: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 18,
        color: colors.white
    }
})