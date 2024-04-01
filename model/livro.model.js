//Definindo o model 
const mongoose = require("mongoose")


const LivroSchema = new mongoose.Schema({
    id: Number,
    titulo: String,
    num_paginas: Number,
    isbn: Number,
    editora: String
});

//Collection
const LivroModel = mongoose.model('livros', LivroSchema);

module.exports =  LivroModel ;