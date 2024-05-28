import { Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useSignInMutation } from '../services/authService'
import { setUser } from "../features/User/userSlice"
import { useDispatch } from 'react-redux'
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    //Un servicio de authService que permite logear al usuario con sus credenciales correctas a traves de triggerSingIn y también entrega 
    //información respecto al servicio ejecutado a traves de result.
    const [triggerSignIn, result] = useSignInMutation()
    //Constante que almacena el email ingresado por el usuario.
    const [email, setEmail] = useState(null)
    //Constante que almacena el password ingresado por el usuario.
    const [password, setPassword] = useState(null)

    const onSubmit = () => {
        //Se trigerea la accion de login, con el email y password ingresado por el usuario.
        triggerSignIn({ email, password })
        //Se setea email y password a null para que la información ingresada por el usuario no quede almacenada,
        //evitando de esta manera, que el usuario inicie sesión con los campos email o password en vacios visualmente.
        //Se elije null porque firebase reconoce string vacio como un caracter, provocando que el tipo de error a mostrar al usuario no sea el 
        //apropiado, por ejemplo: Si intenta logearse con un string vacio, el mensaje mostrado por firebase sería "email invalido" en vez de 
        //indicar que "no hay un correo".
        setEmail(null)
        setPassword(null)
    }

    useEffect(() => {
        //Si el logeo es exitoso, se setea el estado global de email e idToken.
        if (result.isSuccess) {
            dispatch(setUser({
                email: result.data.email,
                idToken: result.data.idToken,
            })
            )
        } if (result.isError) {
            //Si el logeo no es exitoso, se almacena el mensaje del error en errorMessage y se muestra al ususario un mensaje distinto segun 
            //el tipo de error.
            const errorMessage = result.error?.data?.error?.message;
            switch (errorMessage) {
                //Toast que se muestra al usuario cuando ingresa un formato de email invalido.
                case "INVALID_EMAIL":
                    Toast.show({
                        type: 'error',
                        text1: 'Formato de Email Incorrecto',
                        text2: 'Por favor, ingrese un email válido.',
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
                //Toast que se muestra al usuario cuando ingresa un mail o una contraseña invalida para acceder.
                case "INVALID_LOGIN_CREDENTIALS":
                    Toast.show({
                        type: 'error',
                        text1: 'Credenciales Incorrectas',
                        text2: 'El email o la contraseña no son correctos. Inténtelo nuevamente.',
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
                //Toast que se muestra al usuario cuando ha intentado iniciar sesion con la contraseña incorrecta varias veces.
                case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
                    Toast.show({
                        type: 'error',
                        text1: 'Haz realizado demasidos intentos',
                        text2: 'El acceso a esta cuenta se ha deshabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde".',
                        autoHide: true,
                        visibilityTime: 10000,
                        topOffset: 50,
                        text1Style: {
                            fontSize: 16,
                            fontWeight: 'bold',
                        },
                        text2Style: {
                            fontSize: 14,
                            color: 'black',
                            textAlign: 'justify'
                        },
                    });
                    break;
                //Toast que se muestra al usuario cuando no ingresa nada o solo ingresa la contraseña para acceder.
                case "MISSING_EMAIL":
                    Toast.show({
                        type: 'error',
                        text1: 'Falta el correo electrónico',
                        text2: 'El correo electrónico es obligatorio. Por favor, ingrese su correo electrónico.',
                        autoHide: true,
                        visibilityTime: 6000,
                        topOffset: 50,
                        text1Style: {
                            fontSize: 16,
                            fontWeight: 'bold',
                        },
                        text2Style: {
                            fontSize: 14,
                            color: 'black',
                            textAlign: 'justify'
                        },
                    });
                    break;
                //Toast que se muestra al usuario cuando ingresa un correo sin una contraseña para acceder.
                case 'MISSING_PASSWORD':
                    Toast.show({
                        type: 'error',
                        text1: 'Falta la contraseña',
                        text2: 'La contraseña es obligatoria. Por favor, ingrese su contraseña.',
                        autoHide: true,
                        visibilityTime: 6000,
                        topOffset: 50,
                        text1Style: {
                            fontSize: 16,
                            fontWeight: 'bold',
                        },
                        text2Style: {
                            fontSize: 14,
                            color: 'black',
                            textAlign: 'justify'
                        },
                    });
                    break;
                default:
                    //Toast que se muestra al usuario en caso de que el mensaje de error sea distinto a los especificados anteriormente.
                    Toast.show({
                        type: 'error',
                        text1: 'Error Inesperado',
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
                < ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/cuchashop-3cceb.appspot.com/o/backgroundImageLogin.webp?alt=media&token=f80cc2aa-bf63-4477-91bc-f4b662479937' }} style={styles.backgroundImage} resizeMode='cover' >
                    <View style={styles.main}>
                        <View style={styles.container}>
                            <Text style={styles.title}>Iniciar Sesión</Text>
                            <InputForm
                                placeholder={"Email"}
                                onChange={setEmail}
                            />
                            <InputForm
                                placeholder={"Contraseña"}
                                onChange={setPassword}
                                typeInputForm='inputPassword'
                            />
                            <SubmitButton onPress={onSubmit} title="Iniciar Sesión" />
                            <Text style={styles.sub}>¿No tienes una cuenta?</Text>
                            <Pressable onPress={() => navigation.navigate("Signup")}>
                                <Text style={styles.subLink}>Registrarse</Text>
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

export default LoginScreen

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    main: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(55, 146, 55, 0.5)',
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10
    },
    title: {
        fontSize: 22,
        fontFamily: 'OpenSans_SemiCondensed-Bold',
        color: colors.white
    },
    sub: {
        fontSize: 14,
        color: 'blue',
        fontFamily: 'OpenSans_SemiCondensed-Regular',
    },
    subLink: {
        fontSize: 14,
        color: colors.white,
        fontFamily: 'OpenSans_SemiCondensed-Regular',
    },
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }

})