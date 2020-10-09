const express = require('express')
const app = express()
const bodyparser = require('body-parser')

const ObjectId = require('mongodb').ObjectID

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://crudtester:pwd123@cluster0.gb9vi.mongodb.net/<crud>?retryWrites=true&w=majority";

MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err)
  db = client.db('crud') 

  app.listen(3000, () => {
    console.log('Server running on port 3000')
  })
})

app.use(bodyparser.urlencoded({ extended: true}))

app.set('view engine', 'ejs')

app.get('/', function(req, res){
  res.render('home');
});

app.get('/cadastro/cadastrar_funcionario.ejs', function(req, res){
    res.render('cadastro/cadastrar_funcionario');
});

app.get('/cadastro/cadastrar_produto.ejs', function(req, res){
  res.render('cadastro/cadastrar_produto.ejs');
});

 app.get('/', (req, res) => {
    var cursor = db.collection('funcionario').find()
 })

 app.get('/', (req, res) => {
  var cursor = db.collection('produto').find()
 })

app.get('/show/listar_funcionario.ejs', (req, res) => {
    db.collection('funcionario').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show/listar_funcionario.ejs', { data: results })

    })
})

app.get('/show/listar_produto.ejs', (req, res) => {
  db.collection('produto').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('show/listar_produto.ejs', { data: results })

  })
})

app.post('/show/listar_funcionario.ejs', (req, res)=>{
    
    db.collection('funcionario').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log('Salvo no Banco de Dados')
        res.redirect('/show/listar_funcionario.ejs')
      })
});

app.route('/edit/editar_funcionario.ejs/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('funcionario').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit/editar_funcionario.ejs', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var nome = req.body.nome
  var sobrenome = req.body.sobrenome
  var data_nascimento = req.body.data_nascimento
  var cpf = req.body.cpf
  var rg = req.body.rg
  var email = req.body.email
  var telefone = req.body.telefone
  var cargo = req.body.cargo

  db.collection('funcionario').updateOne({_id: ObjectId(id)}, {
    $set: {
      nome: nome,
      sobrenome: sobrenome,
      data_nascimento: data_nascimento,
      cpf: cpf,
      rg: rg,
      email: email,
      telefone: telefone,
      cargo: cargo
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show/listar_funcionario.ejs')
    console.log('Atualizado no Banco de Dados')
  })
})

app.route('/delete-funcionario/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('funcionario').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show/listar_funcionario.ejs')
  })  

})

app.post('/show/listar_produto.ejs', (req, res)=>{
    
  db.collection('produto').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('Salvo no Banco de Dados')
      res.redirect('/show/listar_produto.ejs')
    })
});

app.route('/edit/editar_produto.ejs/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('produto').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit/editar_produto.ejs', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var nomep = req.body.nomep
  var tipo = req.body.tipo
  var descricao = req.body.descricao
  var codigo_barras = req.body.codigo_barras
  var preco = req.body.preco
  var fabricante = req.body.fabricante
  var data_fabricacao = req.body.data_fabricacao
  var peso = req.body.peso

  db.collection('produto').updateOne({_id: ObjectId(id)}, {
    $set: {
      nomep: nomep,
      tipo: tipo,
      descricao: descricao,
      codigo_barras: codigo_barras,
      preco: preco,
      fabricante: fabricante,
      data_fabricacao: data_fabricacao,
      peso: peso

    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show/listar_produto.ejs')
    console.log('Atualizado no Banco de Dados')
  })

})

app.route('/delete-produto/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('produto').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)    
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show/listar_produto.ejs')
    
  })

})


