import * as ExpoSQLite from "expo-sqlite"

//Se abre una base de datos llamada "sessions.db", esta bd se almacena en la memoria del celular. Esta BD no funciona en web, solo funciona 
//en dispisitivos móviles.
const db = ExpoSQLite.openDatabase("sessions.db")

export const initSQLiteDB = () => {
    //Se genera una promesa
    const promise = new Promise((resolve, reject) => {
        //luego se genera la transacción con la base de datos.
        db.transaction((tx) => {
            //Se define la sentencia sql para crear la tabla llamada sessions, con tres campos: localId, email y token.
            //La tabla será creada solo si no existe.
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);",
                [], //Array para pasar parametros a la sentencia sql. En este caso no hay parametros a introducir por lo que se deja vacio.
                (_, result) => resolve(result), //Transaccion resuelta.
                (_, error) => reject(error) //Transacción error.
            )
        })
    })
    return promise
}

export const insertSession = ({
    email,
    localId,
    token
}) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //Setencia sql para insertar datos en la tabla.
            tx.executeSql(
                'INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);',
                [localId, email, token], //Array de parametros
                (_, result) => resolve(result), //Transaccion resuelta
                (_, error) => reject(error) //Transaccion error.
            )
        })
    })
    return promise
}

export const getSession = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //Setencia para obtener todos los registros desde todos los campos de la tabla.
            //La información del registro se devuelve en formato de array.
            tx.executeSql(
                'SELECT * from sessions',
                [], //Array de parametros
                (_, result) => resolve(result), //Transaccion resuelta, a través de la result se obtienen los datos del usuario logeado.
                (_, error) => reject(error) //Transaccion error
            )
        })
    })
    return promise
}

export const dropSessionsTable = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DROP TABLE IF EXISTS sessions",
                (_, result) => resolve(result), //Transacción resuelta
                (_, error) => reject(error) //Transaccion rechazada
            )
        })
    })
    return promise
}

//truncateSessionsTable Elimina todos los registros en la tabla session.
export const truncateSessionsTable = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //Setencia que elimina todos los registros de la tabla. No realizar si hay muchos registros de usuario.
            tx.executeSql(
                "DELETE FROM sessions",
                [], //Array de parametros.
                (_, result) => resolve(result), //Transacción resuelta
                (_, error) => reject(error) //Transaccion rechazada
            )
        })
    })
    return promise
}