const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

// Configuração do app
const app = express();

// Configuração da sessão
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Rotas
app.use('/', require('./routes/produtosRoutes'));

// Banco de dados
const db = require('./config/database');
db.authenticate()
  .then(() => console.log('Conectado ao SQLite...'))
  .catch(err => console.log('Erro: ' + err));

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));



const Produto = require('./models/Produto');


(async () => {
  await db.sync({ force: true }); 
  console.log('Modelo sincronizado com o banco de dados');
  

  await Produto.bulkCreate([
    { nome: 'Arroz', descricao: 'Arroz branco tipo 1', preco: 5.99, quantidade: 100, categoria: 'Grãos' },
    { nome: 'Feijão', descricao: 'Feijão carioca', preco: 8.50, quantidade: 80, categoria: 'Grãos' },
    { nome: 'Óleo', descricao: 'Óleo de soja 900ml', preco: 4.99, quantidade: 120, categoria: 'Condimentos' }
  ]);
})();