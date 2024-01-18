const mongoose = require('mongoose');

const mongoConnect = async () => {
    try {
        // URL de conexión con el nombre de la base de datos en ella
        const mongoURI = 'mongodb+srv://GasDicundo:gastondicundo@cluster0.m6trfbf.mongodb.net/DGAccesorios?retryWrites=true&w=majority';

        // Conectar a MongoDB y crear la base de datos si no existe
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        
        // Indicar que la conexión fue exitosa
        console.log('DB is connected');
    } catch (error) {
        // Manejar errores de conexión
        console.error(error);
    }
};

module.exports = mongoConnect;
