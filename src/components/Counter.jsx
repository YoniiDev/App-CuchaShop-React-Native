import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount, reset } from '../features/Counter/counterSlice'


const Counter = ({ stock }) => {

    //Constante que almacena el valor global del contador.
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    //Constante que almacena la cantidad ingresada manualmente por el usuario.
    const [inputToAdd, setInputToAdd] = useState('')
    //Constante que maneja el estado de la propiedad disable del boton Add
    const [disableButtonAdd, setDisableButtonAdd] = useState(false)
    //Constante que maneja el estilo del boton Add.
    const [addButtonStyle, setAddButtonStyle] = useState(styles.buttonText)
    //Constante que maneja el estilo del TextInput.
    const [spanInputStyle, setSpanInputStyle] = useState(styles.spanInput)

    //Alerta
    //Una alerta que se muestra al usuario cuando ingresa un tipo de dato no valido.
    const invalidDataAlert = () =>
        Alert.alert(
            'Alerta',
            'Por favor, ingrese un número mayor a cero y que no supere el stock disponible.',
            [
                { text: 'OK' },
            ]);

    //handleIncrement
    //Es una función que ejecuta la acción de incrementar y envia la información del stock disponible para que el contador no lo supere.
    const handleIncrement = () => {
        dispatch(increment(stock))
    }

    useEffect(() => {

        if (inputToAdd !== null && inputToAdd !== '') {
            //regexNumbers
            //Es una expresion regular que evalua si el input ingresado por el usuario tiene numeros o no.
            const regexNumbers = /^\d+$/;
            const hasNumbers = regexNumbers.test(inputToAdd);

            if (!hasNumbers || inputToAdd > stock || inputToAdd === '0') {
                //Alerta que avisa al usuario que ingrese un número mayor a cero y que no supere el stock disponible. 
                invalidDataAlert()
                //Setea la constante inputToAdd en string vacio.
                setInputToAdd('')
                //Desactiva el boton Add.
                setDisableButtonAdd(true)
                //Aplica el estilo buttonTextDisable al boton Add.
                setAddButtonStyle(styles.buttonTextDisable)
                //Aplica el estilo spanInputError al TextInput.
                setSpanInputStyle(styles.spanInputError)
            } else {
                //Si todo va bien el boton add se mantiene activado
                setDisableButtonAdd(false)
                //se mantiene el estilo buttonText en el boton Add
                setAddButtonStyle(styles.buttonText)
                //y tambien se mantiene el estilo en el TextInput.
                setSpanInputStyle(styles.spanInput)
            }
        } else {
            setDisableButtonAdd(false)
            setAddButtonStyle(styles.buttonText)
            setSpanInputStyle(styles.spanInput)
        }

    }, [inputToAdd])

    const handleIncrementByAmount = () => {
        //Añade al contador la cantidad ingresada por el usuario en el TextInput.
        dispatch(incrementByAmount(Number(inputToAdd)))
        //Restablece el TextInput en string vacio.
        setInputToAdd('')
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.buttonPressable} onPress={() => dispatch(decrement())}>
                    <Text style={styles.buttonText}>-</Text>
                </Pressable>
                <Text style={styles.span}>{count}</Text>
                <Pressable style={styles.buttonPressable} onPress={handleIncrement}>
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.buttonPressable} onPress={() => dispatch(reset())}>
                    <Text style={styles.buttonText}>Reset</Text>
                </Pressable>
                <TextInput
                    placeholder='Ingrese'
                    placeholderTextColor={'black'}
                    style={spanInputStyle}
                    onChangeText={setInputToAdd}
                    value={inputToAdd}
                />
                <Pressable style={styles.buttonPressable} disabled={disableButtonAdd} onPress={handleIncrementByAmount}>
                    <Text style={addButtonStyle}>Add</Text>
                </Pressable>
            </View>

        </View>
    )
}

export default Counter

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        gap: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    span: {
        backgroundColor: colors.white,
        width: '25%',
        paddingVertical: 1,
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        borderWidth: 1,
        borderColor: colors.gray2
    },
    spanInput: {
        backgroundColor: colors.white,
        width: '25%',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        borderWidth: 1,
        borderColor: colors.gray2,
        color: 'black'
    },
    spanInputError: {
        backgroundColor: colors.white,
        width: '25%',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        borderWidth: 1,
        borderColor: colors.gray2,
        color: 'red'
    },
    buttonPressable: {
        width: '20%',
    },
    buttonText: {
        backgroundColor: colors.green1,
        color: colors.white,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        padding: 3,
        borderRadius: 2,
    },
    buttonTextDisable: {
        backgroundColor: colors.gray,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        padding: 3,
        borderRadius: 2,
        color: colors.black
    }
})