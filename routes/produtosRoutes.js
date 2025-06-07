const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

// Rotas para Produtos
router.get('/', (req, res) => res.render('index'));
router.get('/produtos', produtosController.index);
router.get('/produtos/novo', produtosController.create);
router.post('/produtos', produtosController.store);
router.get('/produtos/:id', produtosController.show);
router.get('/produtos/editar/:id', produtosController.edit);
router.put('/produtos/:id', produtosController.update);
router.delete('/produtos/:id', produtosController.destroy);

module.exports = router;