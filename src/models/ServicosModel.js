const mongoose = require('mongoose');

const ServicoSchema = new mongoose.Schema({
  pet: { type: String, required: true, default: '' },
  nomedono: { type: String, required: true },
  raca: { type: String, required: false, default: '' },
  especie: { type: String, required: false, default: '' },
  servico: { type: String, required: true },
  porte: { type: String, required: false, default: '' },
  transporte: { type: String, required: true },
  data: { type: String, required: true },
  horario: { type: String, required: true, default: '' },
  endereco: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now },
  descricao: String
});

const ServicoModel = mongoose.model('Servico', ServicoSchema);

class Servico {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.servico = null;
    }
      
    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        try {
        const existe = await ServicoModel.findOne({
          data: this.body.data,
          horario: this.body.horario
        });

        if(existe) {
          this.errors.push('Horário indisponível, já agendado para outro cliente.');
          return;
        }

        this.servico = await ServicoModel.create(this.body);

      } catch (e) {
        this.errors.push('Erro interno ao verificar disponibilidade. Tente novamente');
        console.log('Erro no register', e)
      }
    }

    valida() {
        this.cleanUp();

        if (!this.body.pet) {
        this.errors.push('Pet é um campo obrigatório.');
        }

        if(!this.body.nomedono) {
            this.errors.push('Nome do dono é um campo obrigatório.');
        }
        
        if(!this.body.raca) {
            this.errors.push('Raça é um campo obrigatório.');
        }
        
        if(!this.body.servico) {
            this.errors.push('Servico é um campo obrigatório.');
        }
        
        if(!this.body.data) {
            this.errors.push('Data é um campo obrigatório.');
        }
        
        if(!this.body.horario) {
        this.errors.push('Horário é um campo obrigatório.');
        }
    
        if(!this.body.porte) {
        this.errors.push('Porte é um campo obrigatório.');
        }
    
        if(!this.body.transporte) {
        this.errors.push('Transporte é um campo obrigatório.');
        }
    
        if(!this.body.especie) {
        this.errors.push('Espécie é um campo obrigatório.');
        }


    }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    


    this.body = {
      pet: this.body.pet,
      nomedono: this.body.nomedono,
      raca: this.body.raca,
      especie: this.body.especie,
      servico: this.body.servico,
      porte: this.body.porte,
      transporte: this.body.transporte,
      data: this.body.data,
      horario: this.body.horario,
      endereco: this.body.endereco
    };
  }

  async edit(id) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;
    this.servico = await ServicoModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  // Métodos estáticos mantidos igual
  static async searchId(id) {
    if (typeof id !== 'string') return;
    return await ServicoModel.findById(id);
  }

  static async buscaServico() {
    return await ServicoModel.find().sort({ criadoEm: -1 });
  }

  static async delete(id) {
    if (typeof id !== 'string') return;
    return await ServicoModel.findOneAndDelete({ _id: id });
  }

}

module.exports = Servico;
