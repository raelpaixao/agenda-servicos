import validator from 'validator';

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const nomePetInput = el.querySelector('input[name="nomePet"]');
        const racaInput = el.querySelector('input[name="raca"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');
        let error = false;

        for(let erroText of this.form.querySelectorAll('.error-text')) {
            erroText.remove();
        }


        if(!nomeInput.value) {
            error = true;
            this.criaErro(nomeInput, 'Nome é um campo obrigatório.*');
        }

        if(!nomePetInput.value) {
            error = true;
            this.criaErro(nomePetInput, 'Nome do Pet é um campo obrigatório.*');
        }

        if(!racaInput.value) {
            error = true;
            this.criaErro(racaInput, 'Raça é um campo obrigatório.*');
        }

        if(!telefoneInput.value) {
            error = true;
            this.criaErro(telefoneInput, 'Telefeno é um campo obrigatório.');
        }

        if(!error) el.submit();   
    }

    criaErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend' , div);
    }
}