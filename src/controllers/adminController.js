require('dotenv').config();
const bcrypt = require('bcryptjs');
const Login = require('../models/LoginModel');

exports.index = async (req, res) => {
    const usuarios = await Login.buscaUsuarios();
    
    const usuariosFiltrados = usuarios.filter(usuario => {
        return String(usuario._id) !== String(req.session.user._id);
    });

    res.render('admin', { usuarios: usuariosFiltrados });
};

exports.registerIndex = async (req, res) => {
    res.render('admin-register');
};

exports.register = async function(req, res) {
    try{
        const senhaAdmin = req.body.senhaAdmin;

        const senhaCorreta = await bcrypt.compare(
            senhaAdmin,
            process.env.ADMIN_PASSWORD
        );

        if(!senhaCorreta) {
            req.flash('errors', 'Senha do administrador incorreta.');
            req.session.save(() => res.redirect('/admin/register'));
            return;
        }

        const login = new Login(req.body);
        await login.register();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/admin/register');
            });
            return;
        }
    
        req.flash('success', 'Conta cadastrada com sucesso!');
        req.session.save(function() {
            return res.redirect('/admin/dashboard');
        });
    } catch(e) {
        console.log(e);
        return res.render('includes/404');
    }
};

exports.delete = async (req, res) => {
    if (!req.params.id) {
        req.flash('errors', 'Usuário não encontrado.');
        return res.redirect('/admin/dashboard');
    }

    const usuario = await Login.delete(req.params.id);
    if (!usuario) {
        req.flash('errors', 'Não foi possível excluir o usuário.');
        return res.redirect('/admin/dashboard');
    }

    req.flash('success', 'Usuário excluído com sucesso.');
    return res.redirect('/admin/dashboard');
};