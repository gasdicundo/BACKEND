const mongoose = require ('mongoose')

const mongoConnect = async () => {
    try{
       await mongoose.connect('mongodb+srv://GasDicundo:gastondicundo@cluster0.m6trfbf.mongodb.net/DGAccesorios?retryWrites=true&w=majority')
       console.log ('db is connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = mongoConnect