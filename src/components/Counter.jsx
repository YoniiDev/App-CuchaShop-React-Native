import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount, reset } from '../features/Counter/counterSlice'


const Counter = (stock) => {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    const [inputToAdd, setInputToAdd] = useState(null)
    const [disableButtonAdd, setDisableButtonAdd] = useState(false)
    const [spanInputStyle, setSpanInputStyle] = useState(styles.spanInput)
    const [addButtonStyle, setAddButtonStyle] = useState(styles.buttonText)

    const invalidDataAlert = () =>
        Alert.alert(
            'Alerta',
            'Por favor, ingrese un número mayor a cero y que no supere el stock disponible.',
            [
                { text: 'OK' },
            ]);

    const handleIncrement = () => {
        dispatch(increment(stock))
    }

    useEffect(() => {

        if (inputToAdd !== null && inputToAdd !== '') {
            const regexNumbers = /^\d+$/;
            const hasNumbers = regexNumbers.test(inputToAdd);

            if (!hasNumbers || inputToAdd > stock.stock || inputToAdd === '0') {
                invalidDataAlert()
                setInputToAdd(null)
                setDisableButtonAdd(true)
                setAddButtonStyle(styles.buttonTextDisable)
                setSpanInputStyle(styles.spanInputError)
            } else {
                setDisableButtonAdd(false)
                setAddButtonStyle(styles.buttonText)
                setSpanInputStyle(styles.spanInput)
            }
        } else {
            setDisableButtonAdd(false)
            setAddButtonStyle(styles.buttonText)
            setSpanInputStyle(styles.spanInput)
        }

    }, [inputToAdd])

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
                <Pressable style={styles.buttonPressable} disabled={disableButtonAdd} onPress={() => dispatch(incrementByAmount(Number(inputToAdd)))}>
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