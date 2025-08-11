const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    nome: { type: String, required: true },
    funcao: { type: String, required: true },
    password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
        this.cleanUp();
    }

    async login() {
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if(!this.user) {
            this.errors.push('Usuário não cadastrado.');
        return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Endereço de E-mail e/ou senha inválidos.');
            this.user = null;
            return;
        }
    }

    async register() {
        this.validaRegister();
        if(this.errors.length > 0) return;
        
        await this.userExists();
        
        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        
        this.user = await LoginModel.create(this.body);
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if(this.user) this.errors.push('E-mail já cadastrado.')

    }
    
    valida() {

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

        if(this.body.password.length < 6 || this.body.password.length > 12) {
            this.errors.push('A senha deve conter entre 6 a 12 caracteres.');
        }

        
    }
    
    validaRegister() {

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

        if(this.body.password.length < 6 || this.body.password.length > 12) {
            this.errors.push('A senha deve conter entre 6 a 12 caracteres.');
        }
    
        if(!this.body.nome) {
            this.errors.push('Nome é um campo obrigatório.')
        }
    
        if(!this.body.funcao) {
            this.errors.push('Função é um campo obrigatório.')
        }
    
        if(!this.body.password) {
            this.errors.push('Senha do novo Usuário é um campo obrigatório.')
        }

    }

    cleanUp() {
       for(const key in this.body) {
        if(typeof this.body[key] !== 'string') { 
            this.body[key] = ''
        }
       }

       this.body = {
        email: this.body.email,
        nome: this.body.nome,
        funcao: this.body.funcao,
        password: this.body.password
       }
    }

    static async buscaUsuarios() {

    return await LoginModel.find().select('-password').sort({ _id: -1 });
    }

    static async delete(id) {
    if (typeof id !== 'string') return;
    return await LoginModel.findOneAndDelete({ _id: id });
    }
    
}

module.exports = Login;