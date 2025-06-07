const Produto = require('../models/Produto');

// Lista todos os produtos
exports.index = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.render('produtos/index', { produtos });
  } catch (err) {
    req.flash('error_msg', 'Erro ao carregar produtos');
    res.redirect('/');
  }
};

// Mostra um produto
exports.show = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    res.render('produtos/show', { produto });
  } catch (err) {
    req.flash('error_msg', 'Produto não encontrado');
    res.redirect('/produtos');
  }
};

// Formulário de criação
exports.create = (req, res) => {
  res.render('produtos/form', { produto: null });
};

// Salva um novo produto
exports.store = async (req, res) => {
  const { nome, descricao, preco, quantidade, categoria } = req.body;
  
  try {
    await Produto.create({ nome, descricao, preco, quantidade, categoria });
    req.flash('success_msg', 'Produto criado com sucesso!');
    res.redirect('/produtos');
  } catch (err) {
    req.flash('error_msg', 'Erro ao criar produto');
    res.redirect('/produtos/novo');
  }
};

// Formulário de edição
exports.edit = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    res.render('produtos/form', { produto });
  } catch (err) {
    req.flash('error_msg', 'Produto não encontrado');
    res.redirect('/produtos');
  }
};

// Atualiza um produto
exports.update = async (req, res) => {
  const { nome, descricao, preco, quantidade, categoria } = req.body;
  
  try {
    await Produto.update(
      { nome, descricao, preco, quantidade, categoria },
      { where: { id: req.params.id } }
    );
    req.flash('success_msg', 'Produto atualizado com sucesso!');
    res.redirect('/produtos');
  } catch (err) {
    req.flash('error_msg', 'Erro ao atualizar produto');
    res.redirect(`/produtos/editar/${req.params.id}`);
  }
};

// Remove um produto
exports.destroy = async (req, res) => {
  try {
    await Produto.destroy({ where: { id: req.params.id } });
    req.flash('success_msg', 'Produto removido com sucesso!');
    res.redirect('/produtos');
  } catch (err) {
    req.flash('error_msg', 'Erro ao remover produto');
    res.redirect('/produtos');
  }
};