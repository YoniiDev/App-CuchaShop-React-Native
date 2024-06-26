import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { colors } from '../constants/colors'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../features/Shop/shopSlice'

const SearchProduct = ({ onSearch = () => { }, error = "", navigation }) => {

    const [keyword, setKeyword] = useState("")
    const hasError = error !== "";
    const containerStyle = hasError ? styles.containerError : styles.container;
    const inputStyle = hasError ? styles.inputError : styles.input;
    const dispatch = useDispatch()

    const handleGoBack = () => {
        dispatch(setCategorySelected(''))
        navigation.goBack()
    }

    return (
        <View style={containerStyle}>

            <TextInput
                style={inputStyle}
                placeholder='Buscar... 🐕‍🦺'
                value={keyword}
                onChangeText={setKeyword}
            />
            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            <Pressable onPress={() => onSearch(keyword)}>
                <Ionicons name="search" size={28} color="white" />
            </Pressable>
            <Pressable onPress={() => setKeyword("")}>
                <FontAwesome5 name="eraser" size={28} color="white" />
            </Pressable>
            <Pressable onPress={handleGoBack}>
                <AntDesign name="back" size={28} color="white" />
            </Pressable>
        </View>
    )
}

export default SearchProduct

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: colors.green3,
        paddingBottom: 10,
        padding: 6
    },
    containerError: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: colors.green3,
        paddingBottom: 10,
        height: 74,
        padding: 5
    },

    input: {
        width: '65%',
        height: 35,
        paddingHorizontal: 8,
        fontSize: 14,
        backgroundColor: colors.white,
        color: colors.black,
        borderRadius: 18,
        position: 'relative',
    },
    inputError: {
        width: '65%',
        height: 35,
        paddingHorizontal: 8,
        fontSize: 14,
        backgroundColor: colors.white,
        color: 'red',
        borderRadius: 18,
        position: 'relative',
        textDecorationLine: 'underline'
    },
    errorMessage: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
        backgroundColor: colors.white,
        borderRadius: 4,
        position: 'absolute',
        bottom: 6,
        left: 10,
        paddingVertical: 1,
        paddingHorizontal: 6,
    }
})