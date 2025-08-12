const Servico = require('../models/ServicosModel');

exports.index = (req, res) => {
    res.render('servicos', {
        servico: {}
    });
};

exports.register = async (req, res) => {
    try {
        const servico = new Servico(req.body);
        await servico.register();
    
        if(servico.errors.length > 0) {
            return res.render('servicos', {
                errors: servico.errors,
                servico: req.body
            });
        }
    
        req.flash('success', 'Serviço adicionado com sucesso.');
        req.session.save(() => res.redirect(`/servico/index/${servico.servico._id}`));
        return;
    } catch(e) {
        console.log(e);
        return res.render('includes/404');
    }
};

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const servico = await Servico.searchId(req.params.id);
    if(!servico) return res.render('includes/404');

    res.render('servicos', { servico });
};

exports.edit = async function(req, res) {
    try {
        if(!req.params.id) return res.render('includes/404');
        const servico = new Servico(req.body);
        await servico.edit(req.params.id);

        if(servico.errors.length > 0) {
            req.flash('errors', servico.errors);
            req.session.save(() => res.redirect(`/servico/index/${req.params.id}`));
            return;
        }
    
        req.flash('success', 'Serviço editado com sucesso.');
        req.session.save(() => res.redirect(`/servico/index/${req.params.id}`));
        return;
    } catch(e) {
        console.log(e);
        res.render('includes/404');
    }

};

exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('includes/404');

    const servico = await Servico.delete(req.params.id);
    if(!servico) return res.render('404');

    req.flash('success', 'Serviço excluído com sucesso.');
    req.session.save(() => res.redirect('/agenda/index'));
    return;
}