import {connect} from 'mongoose';

export async function ConnectDatabase() {
    try {
        await connect('mongodb://127.0.0.1:27017/todolist')
        console.log("conectado a la base de datos.")
    } catch(error) {
        console.log(`Ha ocurrido un error con la base de datos: ${error}`)
    }
}