const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN );

        console.log('Base de Datos conectada!!');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión a la Base de Datos');
    }

}


module.exports = {
    dbConnection
}