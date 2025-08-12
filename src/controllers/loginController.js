require('dotenv').config();
const bcrypt = require('bcryptjs');
const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) {
        return res.redirect('/agenda/index');
    }
    return res.render('login');
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
    
        req.flash('success', 'Colaborador registrado com sucesso.');
        req.session.save(function() {
            return res.redirect('/admin/dashboard');
        });
    } catch(e) {
        console.log(e);
        return res.render('includes/404');
    }
};

exports.login = async function(req, res) {
    try{
        const login = new Login(req.body);
        await login.login();

    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });
            return;
        }

    
        req.flash('success', 'Você entrou no sistema');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/logado');
        });
    } catch(e) {
        console.log(e);
        return res.render('includes/404');
    }
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/login/index');
}