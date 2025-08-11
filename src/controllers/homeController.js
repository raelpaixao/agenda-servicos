const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
  const search = req.query.search || '';
  const contatos = await Contato.buscaContatos(search);
  res.render('index', { contatos, search });
};
