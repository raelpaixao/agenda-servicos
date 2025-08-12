const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: String
});

const AgendaModel = mongoose.model('Agenda', AgendaSchema);

class Agenda {

}

module.exports = Agenda;