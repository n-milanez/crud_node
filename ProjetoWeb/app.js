const express = require('express')
const app = express()
const { engine } = require('express-handlebars');
const handlebars = require('handlebars') // <-- importa o Handlebars puro
const bodyParser = require('body-parser')
const post = require('./models/post')

// Registrando o helper 'eq'
handlebars.registerHelper('eq', function (a, b) {
    return a === b;
})

// Configuração do Template Engine
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(8081, function(){
    console.log('Servidor Ativo!')
})

app.post('/cadastrar', function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send('Erro ao criar o post: ' + erro)
    })
})

 app.get('/consulta', function(req,res){
    post.findAll().then(function(posts){
        res.render('consulta', {posts: posts})
        console.log(posts)
    }).catch(function(erro){
        res.send('Erro ao listar os posts: '+erro)
    })
 })

 app.get('/atualizar/:id', function(req,res){
    post.findAll({where: {id: req.params.id}}).then(function(posts){
        res.render('atualizar', {posts: posts})
    }).catch(function(erro){
        res.send('Erro ao listar os posts: '+erro)
    })
})

app.get('/excluir/:id', function(req,res){
    post.destroy({where: {id: req.params.id}}).then(function(posts){
        res.redirect('/consulta')
    }).catch(function(erro){
        res.send('Erro ao escluir o post: '+erro)
    })
})


app.get("/", function(req, res){
    res.render("primeira_pagina")
})



