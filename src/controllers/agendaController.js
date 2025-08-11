const Servico = require('../models/ServicosModel');

function formatarDataBR(dataISO) {
    if (!dataISO) return '';
    const dataObj = new Date(dataISO);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

exports.index = async function (req, res) {
    const servicos = await Servico.buscaServico();

    servicos.forEach(s => {
        s.data = formatarDataBR(s.data);
    });

    res.render('agenda', { servicos });
};
