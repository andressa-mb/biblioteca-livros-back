const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dbLivro')
.then(() => console.log("MongoDB Conectado!"))
.catch((err) => console.log("Erro ao se conectar no MongoDB. ", err))

module.exports = mongoose
