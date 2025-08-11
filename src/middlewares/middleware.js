exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.outroMiddleware = (req, res, next) => {
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        return res.render('includes/404');
    }

    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.checkAdm = (req, res, next) => {
    if(req.session.user && req.session.user.isAdmin) {
        return next()
    }

    req.flash('errors', 'Acesso negado.');
    return res.redirect('/negado')
};

exports.loginRequiredSericos = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login para adicionar serviços a agenda.');
        req.session.save(() => res.redirect('/login/index'));
        return;
    }

    next();
};

exports.loginRequiredAgenda = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login para acessar agenda.');
        req.session.save(() => res.redirect('/login/index'));
        return;
    }

    next();
};

exports.loginRequiredClientes = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login para acessar os clientes.');
        req.session.save(() => res.redirect('/login/index'));
        return;
    }

    next();
};

exports.loginRequiredContato = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login para adicionar clientes.');
        req.session.save(() => res.redirect('/login/index'));
        return;
    }

    next();
};