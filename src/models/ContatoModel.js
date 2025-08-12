const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  nomePet: { type: String, required: false, default: '' },
  raca: { type: String, required: false, default: '' },
  porte: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now },
  descricao: String
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }
      
    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }

    valida() {
    this.cleanUp();

    if (!this.body.raca) {
    this.errors.push('Raça é um campo obrigatório.');
    }

    if(!this.body.nome) {
    this.errors.push('Nome é um campo obrigatório.');
    }

    if(!this.body.nomePet) {
    this.errors.push('Nome do Pet é um campo obrigatório.');
    }

    if(!this.body.telefone) {
    this.errors.push('Telefone é um campo obrigatório.');
    }

    }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      nome: this.body.nome,
      nomePet: this.body.nomePet,
      raca: this.body.raca,
      porte: this.body.porte,
      telefone: this.body.telefone
    };
  }

  async edit(id) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  // Métodos estáticos mantidos igual
  static async searchId(id) {
    if (typeof id !== 'string') return;
    return await ContatoModel.findById(id);
  }

  static async buscaContatos(nome = '') {
    if (nome) {
      return await ContatoModel.find({ nome: { $regex: nome, $options: 'i' } }).sort({ criadoEm: -1 });
    }
    return await ContatoModel.find().sort({ criadoEm: -1 });
  }


  static async delete(id) {
    if (typeof id !== 'string') return;
    return await ContatoModel.findOneAndDelete({ _id: id });
  }
}

module.exports = Contato;
