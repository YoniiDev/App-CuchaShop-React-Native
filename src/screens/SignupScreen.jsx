import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { colors } from '../constants/colors'
import SubmitButton from '../components/SubmitButton'
import InputForm from '../components/InputForm'
import { useSignUpMutation } from '../services/authService'
import { setUser } from '../features/User/userSlice'
import { signupSchema } from '../validations/authSchema'
import Toast from 'react-native-toast-message';
import { Feather } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {

    //Constante que almacena el email ingresado por el usuario.
    const [email, setEmail] = useState(null)
    //Constante que almacena el mensaje de error correspondiente al email, proveniente de signupSchema.validateSync.
    const [errorMail, setErrorMail] = useState("")
    //Constante que almacena el password ingresado por el usuario.
    const [password, setPassword] = useState(null)
    //Constante que almacena el mensaje de error correspondiente al password, proveniente de signupSchema.validateSync.
    const [errorPassword, setErrorPassword] = useState("")
    //Constante que almacena el confirmPassword ingresaso por el usuario.
    const [confirmPassword, setConfirmPassword] = useState(null)
    //Constante que almacena el mensaje de error correspondiente al confirmPassword, proveniente de signupSchema.validateSync.
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

    const dispatch = useDispatch()

    //Un servicio de authService que permite al usuario registrarse en la aplicación a través triggerSignUp.
    //Y a traves de result nos entrega información relacionada al proceso.
    const [triggerSignUp, result] = useSignUpMutation()

    const onSubmit = () => {
        try {
            //Se setean los errores en string vacío en caso de que haya habido algun error anteriormente.
            setErrorMail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            //signupSchema.validateSync valida que los campos completados por el usuario al momento de registrarse, cumplan con las reglas especificadas.
            const validation = signupSchema.validateSync({ email, password, confirmPassword })
            //Si la información ingresada por el usuario pasa la validacion de signupSchema.validateSync se trigerea la accion de registro.
            triggerSignUp({ email, password, returnSecureToken: true })
            //Se setean a null las contantes email, password y confirmPassword para evitar que la información quede almacenada. 
            //De esta manera se evitan mensajes de errores inadecuados. 
            setEmail(null)
            setPassword(null)
            setConfirmPassword(null)

        } catch (err) {
            //En caso de que la información ingresada por el usuario no pase la validación de signupSchema.validateSync, se le indica al 
            //usuario el tipo de error en la validación.
            switch (err.path) {
                case "email":
                    //Si el error de validación conrresponde al email, se setea el mensaje de error correspondiente al email en errorEmail.
                    setErrorMail(err.message)
                    break;
                case "password":
                    //Si el error de validación corresponde al password, se setea el mensaje de error correspondiente al password en errorPassword.
                    setErrorPassword(err.message)
                case "confirmPassword":
                    //Si el error de validación corresponde al confirmPasswod, se setea el mensaje de error correspondiente a confirmPassword en errorConfirmPassword.
                    setErrorConfirmPassword(err.message)
                default:
                    break;
            }
        }
    }

    useEffect(() => {
        //Si el registro de usuario es exitoso en FireBase se setea el estado global de user(con el email), el estado global de idToken y localId.
        if (result.isSuccess) {
            dispatch(setUser({
                email: result.data.email,
                idToken: result.data.idToken,
                localId: result.data.localId
            })
            )

        } else if (result.isError) {
            //Si el registro de usuario no es exitoso en FireBase, se almacena el mensaje de error proveniente de FireBases en errorMessage.
            const errorMessage = result.error?.data?.error?.message;
            switch (errorMessage) {
                case 'EMAIL_EXISTS':
                    //Si el email ya existe en FireBase se le indica al usuario a traves de una tostada que el email con el cual se esta 
                    //registrando ya se encuentra registrado. 
                    Toast.show({
                        type: 'error',
                        text1: 'Registro fallido',
                        text2: 'El correo electrónico que has ingresado ya está registrado. Por favor, intenta iniciar sesión o usa otro correo.',
                        autoHide: true,
                        visibilityTime: 6000,
                        topOffset: 50,
                        text1Style: {
                            fontSize: 16,
                            fontWeight: 'bold',
                        },
                        text2Style: {
                            fontSize: 14,
                            color: 'black'
                        },

                    });
                    break;

                default:
                    //En caso de que haya algun tipo de error de FireBase no especificado todavía, se mostrara la siguiente tostada al usuario.
                    Toast.show({
                        type: 'error',
                        text1: 'Error inesperado',
                        text2: 'Ha ocurrido un error inesperado. Por favor, intente más tarde.',
                        autoHide: true,
                        visibilityTime: 6000,
                        topOffset: 50,
                        text1Style: {
                            fontSize: 16,
                            fontWeight: 'bold',
                        },
                        text2Style: {
                            fontSize: 14,
                            color: 'black'
                        },

                    });
                    break;
            }
        }
    }, [result])

    return (
        <>
            {!result.isLoading ?
                <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cuchashop-3cceb.appspot.com/o/backgroundImageLogin.webp?alt=media&token=f80cc2aa-bf63-4477-91bc-f4b662479937' }} style={styles.backgroundImage} resizeMode='cover'>
                    <View style={styles.main}>
                        <View style={styles.container}>
                            <Text style={styles.title}>Registrarse</Text>
                            <InputForm placeholder={"Email"} onChange={setEmail} error={errorMail} />
                            <InputForm
                                placeholder={"Contraseña"}
                                onChange={setPassword}
                                error={errorPassword}
                                typeInputForm='inputPassword'
                            />
                            <InputForm
                                placeholder={"Confirmar Contraseña"}
                                onChange={setConfirmPassword}
                                error={errorConfirmPassword}
                                typeInputForm='inputPassword'
                            />
                            <SubmitButton onPress={onSubmit} title="Registrarse" />
                            <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
                            <Pressable onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.subLink}>Iniciar Sesión</Text>
                            </Pressable>
                        </View>
                    </View>
                </ImageBackground >
                :
                <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cuchashop-3cceb.appspot.com/o/backgroundImageLogin.webp?alt=media&token=f80cc2aa-bf63-4477-91bc-f4b662479937' }} style={styles.backgroundImage} resizeMode='cover'>
                    <View style={styles.loaderContainer}>
                        <Feather name="loader" size={50} color="black" />
                    </View>
                </ImageBackground>
            }
        </>
    )
}

export default SignupScreen;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    main: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(55, 146, 55, 0.4)',
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        color: colors.white
    },
    sub: {
        fontSize: 14,
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        color: 'blue',
    },
    subLink: {
        fontSize: 14,
        fontFamily: 'OpenSans_SemiCondensed-Regular',
        color: colors.white
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});