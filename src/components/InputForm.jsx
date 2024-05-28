import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { FontAwesome } from '@expo/vector-icons';

const InputForm = ({ placeholder, onChange, error = "", typeInputForm }) => {

    //Constante que almacena la información ingresada por el usuario.
    const [input, setInput] = useState("")
    //Constante para almacenar el estado de isSecure.
    const [isSecure, setIsSecure] = useState(true)


    const onChangeText = (text) => {
        //Setea el valor de input con la información ingresada por el usuario.
        setInput(text)
        //Función para setear el valor de las constantes o variables ubicadas en otros componentes, con la información ingresada por el usuario.
        onChange(text)
    }

    //Funcion para cambiar el estado de isSecure, lo que permite ocultar o mostrar la contraseña.
    const handleIsSecure = () => {
        setIsSecure(() => !isSecure)
    }

    return (
        <>
            {typeInputForm === 'inputPassword' ?
                <View style={styles.inputContainer}>
                    <View style={styles.textInputAndEyeIconContainer}>
                        <TextInput
                            style={styles.inputPassword}
                            value={input}
                            onChangeText={onChangeText}
                            secureTextEntry={isSecure}
                            placeholder={placeholder}
                            placeholderTextColor='white'
                        />
                        {isSecure === false ?
                            <FontAwesome style={styles.eyeIcon} name="eye" size={24} color="white" onPress={handleIsSecure} />
                            :
                            <FontAwesome name="eye-slash" size={24} color="white" onPress={handleIsSecure} />}
                    </View>

                    {error ?
                        <Text style={styles.error}>{error}</Text>
                        :
                        null
                    }
                </View>
                :
                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        placeholderTextColor='white'
                    />
                    {error ?
                        <Text style={styles.error}>{error}</Text>
                        :
                        null
                    }
                </View>
            }
        </>
    )
}

export default InputForm

const styles = StyleSheet.create({
    inputContainer: {
        flexDrection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.white

    },
    textInputAndEyeIconContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    inputPassword: {
        width: '88%',
        borderWidth: 0,
        padding: 2,
        fontFamily: 'OpenSans_SemiCondensed-SemiBold',
        fontSize: 16,
        color: colors.white,
        borderRightWidth: 1,
        borderColor: colors.white,

    },
    input: {
        width: '97%',
        borderWidth: 0,
        padding: 2,
        fontFamily: 'OpenSans_SemiCondensed-SemiBold',
        fontSize: 16,
        color: colors.white,
    },
    eyeIcon: {

    },
    error: {
        fontSize: 15,
        color: 'red',
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        borderWidth: 1
    },
})