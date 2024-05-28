import { object, string, ref } from "yup"
export const signupSchema = object().shape({
    email: string().required("El correo electrónico es requerido").email("No es un correo electrónico válido"),
    password: string()
        .required("Se requiere contraseña")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: string()
        .oneOf([ref("password"), null], "Las contraseñas deben coincidir")
        .required('Confirmar contraseña es un campo obligatorio'),
})