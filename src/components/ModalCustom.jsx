import { StyleSheet, Text, View, Modal, Button, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const ModalCustom = ({ modalVisible = false, text1, text2, titleButtonLeft = '', titleButtonRight = '', onPressButtonLeft = () => { }, onPressButtonRight = () => { } }) => {
    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalStyles}>
                <View style={styles.modalContainer}>
                    {text1 ?
                        <View style={styles.text1Container}>
                            <Text style={styles.text1}>{text1}</Text>
                        </View>
                        : null
                    }
                    {text2 ?
                        <View style={styles.text2Container}>
                            <Text style={styles.text2}>{text2}</Text>
                        </View>
                        : null
                    }

                    <View style={styles.btnContainer}>
                        <Pressable style={styles.buttonLeft}>
                            <Text style={styles.textButtonLeft} onPress={onPressButtonLeft}>{titleButtonLeft}</Text>
                        </Pressable>
                        <Pressable style={styles.buttonRight}>
                            <Text style={styles.textButtonRight} onPress={onPressButtonRight}>{titleButtonRight}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default ModalCustom

const styles = StyleSheet.create({
    modalStyles: {
        backgroundColor: "#cccccc60",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        borderColor: colors.green2,
        borderWidth: 2,
        width: "80%",
        alignItems: "center",
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 15,
        borderRadius: 7,
    },
    text1Container: {
        width: '90%',
    },
    text1: {
        textAlign: 'center',
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        fontSize: 17
    },
    text2Container: {
        width: '90%',
    },
    text2: {
        textAlign: 'left',
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 15
    },

    btnContainer: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: "row",
    },
    buttonLeft: {
        width: '30%',
        backgroundColor: colors.green1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        borderRadius: 10
    },
    textButtonLeft: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 16,
        color: 'white'
    },
    buttonRight: {
        width: '30%',
        backgroundColor: colors.green1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        borderRadius: 10
    },
    textButtonRight: {
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        fontSize: 16,
        color: 'white'
    }
})