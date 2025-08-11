// Arquivo ROUTES para separar minhas rotas
const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const agendaController = require('./src/controllers/agendaController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const adminController = require('./src/controllers/adminController');
const servicoController = require('./src/controllers/servicoController');

const { loginRequiredContato, loginRequiredSericos, loginRequiredAgenda, loginRequiredClientes, checkAdm } = require('./src/middlewares/middleware');


// Rotas de Login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);
 
// Rotas da Clientes
route.get('/clientes/index', loginRequiredClientes, homeController.index);

// Rota agenda
route.get('/agenda/index', loginRequiredAgenda, agendaController.index);

// Rota negado
route.get('/negado', (req, res) => {
    res.render('negado');
});
route.get('/logado', (req, res) => {
    res.render('login-logado');
});

// Rotas ADM
route.get('/admin/dashboard', checkAdm, adminController.index);
route.get('/admin/register', checkAdm, adminController.registerIndex);
route.post('/admin/register', checkAdm, adminController.register);
route.get('/admin/delete/:id', checkAdm, adminController.delete);


// Rotas de serviços
route.get('/servico/index', loginRequiredSericos, servicoController.index);
route.post('/servico/register', loginRequiredSericos, servicoController.register);
route.get('/servico/index/:id', loginRequiredSericos, servicoController.editIndex);
route.post('/servico/edit/:id', loginRequiredSericos, servicoController.edit);
route.get('/servico/delete/:id', loginRequiredSericos, servicoController.delete);

// Rotas de contato
route.get('/contato/index', loginRequiredContato, contatoController.index);
route.post('/contato/register', loginRequiredContato, contatoController.register);
route.get('/contato/index/:id', loginRequiredContato, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequiredContato, contatoController.edit);
route.get('/contato/delete/:id', loginRequiredContato, contatoController.delete);

// Rota raiz - redireciona para login
route.get('/', (req, res) => {
  res.redirect('/login/index');
});

module.exports = route;
