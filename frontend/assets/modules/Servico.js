export default class Servico {
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
        const petInput = el.querySelector('input[name="pet"]');
        const racaInput = el.querySelector('input[name="raca"]');
        const nomeDonoInput = el.querySelector('input[name="nomedono"]');
        const porteInput = el.querySelector('input[name="porte"]');
        const especieInput = el.querySelector('input[name="especie"]');
        const servicoInput = el.querySelector('input[name="servico"]');
        const dataInput = el.querySelector('input[name="data"]');
        const horarioInput = el.querySelector('input[name="horario"]');
        const transporteInput = el.querySelector('input[name="transporte"]');
        const enderecoInput = el.querySelector('input[name="endereco"]');
        let error = false;

        for(let erroText of this.form.querySelectorAll('.error-text')) {
            erroText.remove();
        }


        if(!petInput.value) {
            error = true;
            this.criaErro(petInput, 'Nome do Pet é um campo obrigatório.*');
        }
        
        if(!racaInput.value) {
            error = true;
            this.criaErro(racaInput, 'Raça é um campo obrigatório.*');
        }

        if(!nomeDonoInput.value) {
            error = true;
            this.criaErro(nomeDonoInput, 'Nome do Dono é um campo obrigatório.*');
        }

        if(!porteInput.value) {
            error = true;
            this.criaErro(porteInput, 'Porte é um campo obrigatório.');
        }

        if(!servicoInput.value) {
            error = true;
            this.criaErro(servicoInput, 'Serviço é um campo obrigatório.');
        }

        if(!dataInput.value) {
            error = true;
            this.criaErro(dataInput, 'Data é um campo obrigatório.');
        }

        if(!horarioInput.value) {
            error = true;
            this.criaErro(horarioInput, 'Horário é um campo obrigatório.');
        }

        if(!transporteInput.value) {
            error = true;
            this.criaErro(transporteInput, 'Transporte é um campo obrigatório.');
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
