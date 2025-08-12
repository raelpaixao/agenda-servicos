import validator from 'validator';

export default class Login {
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
        const funcaoInput = el.querySelector('input[name="funcao"]');
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        const confirmpasswordInput = el.querySelector('input[name="confirm-password"]');
        let error = false;

        for(let erroText of this.form.querySelectorAll('.error-text')) {
            erroText.remove();
        }



        if(!validator.isEmail(emailInput.value)) {
            error = true;
            this.criaErro(emailInput, 'Email inválido.');
        }

        if(!nomeInput.value) {
            error = true;
            this.criaErro(nomeInput, 'Nome é um campo obrigatório.');
        }

        if(!funcaoInput.value) {
            error = true;
            this.criaErro(funcaoInput, 'Função é um campo obrigatório.');
        }
        
        if(passwordInput.value.length < 6 || passwordInput.value.length > 12) {
            error = true;
            this.criaErro(passwordInput, 'A senha deve conter de 6 a 12 caracteres.');
        }
        
        if(confirmpasswordInput && passwordInput.value !== confirmpasswordInput.value) {
            error = true;
            this.criaErro(confirmpasswordInput, 'Os campos de senha e confirmar senha devem ser iguais.');
        }
        
        if(!passwordInput.value) {
            error = true;
            this.criaErro(passwordInput, 'Senha do novo Usuário é um campo obrigatório.');
        }
        
        if(!confirmpasswordInput.value) {
            error = true;
            this.criaErro(confirmpasswordInput, 'Confirmar Senha do novo Usuário é um campo obrigatório.');
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