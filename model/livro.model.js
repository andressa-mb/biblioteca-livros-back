//Definindo o model 
const mongoose = require('../config/mongo')


const LivroSchema = new mongoose.Schema({
    id: Number,
    titulo: String,
    num_paginas: Number,
    isbn: Number,
    editora: String
});

//Collection
const LivroModel = mongoose.model('livros', LivroSchema);

module.exports = LivroModel;