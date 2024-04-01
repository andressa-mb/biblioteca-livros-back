const express = require('express');
const LivroModel = require('./model/livro.model');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors())

app.get('/teste', async (req, res) => {
    return res.status(200).json({success: true});
})

app.post('/livros/cadastro', async (req, res) => {
    
    console.log(req)
    try{
        const { id, titulo, num_paginas, isbn, editora } = req.body;

        if(!id || !titulo || !num_paginas || !isbn || !editora){
            return res.status(404).json({message: "Por favor, preencha todos os campos."})
        }

        const ultimoLivro = await LivroModel.findOne({}, {}, {sort: {'id': -1}});
        let proximoId = 1;
        if(ultimoLivro){
            proximoId = ultimoLivro.id + 1;
        }

        const novoLivro = new LivroModel({
            id: proximoId,
            titulo,
            num_paginas,
            isbn,
            editora
        });

        const livroSalvo = await novoLivro.save();

        res.status(201).json({message: "Livro criado com sucesso", livro: livroSalvo})

    }catch(error){
        res.status(500).json({message: "Erro ao criar o livro", error: error.message})
    }
})

app.get('/livros', async (req, res) => {
    const livros = await LivroModel.find();
    return res.status(200).json(livros);
})

app.get('/livros/:id', async (req, res) => {
    const livroId = req.params.id;

    try{
        const livro = await LivroModel.findOne({ id: livroId });

        if(!livro){
            return res.status(404).json({message: "Livro não encontrado"})
        }

        res.status(200).json(livro);
    }catch(error){
        console.error("Erro ao obter o livro: ", error);
        res.status(500).json({message: "Erro ao obter o livro"});
    }
})

app.put('/livros/edicao/:id', async (req, res) => {
    
    try {
        const livro = await LivroModel.updateOne({ id: req.params.id }, req.body);
        if (!livro) {
            return res.status(404).send("Livro não encontrado");
        }
        return res.status(200).json(livro);
    } catch (error) {
        res.status(500).send(error);
    }
    });

app.delete('/livros/:id', async (req, res) => {
    try {
        const livro = await LivroModel.deleteOne({id: req.params.id});
        if(!livro) {
            return res.status(404).send("Livro não encontrado");
        }
        return res.status(200).json(livro);
    } catch (error) {
        res.status(500).send(error);
    }
});
    
app.listen(8080, () => {
    console.log("Servidor funcionando na porta 8080")
})