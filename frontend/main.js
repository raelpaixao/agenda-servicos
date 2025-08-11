import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';

import Login from './assets/modules/Login';
import Contato from './assets/modules/Contato';
import Servico from './assets/modules/Servico';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
const contato = new Contato('.form-contato');
const servico = new Servico('.form-servico');

login.init();
cadastro.init();
contato.init();
servico.init();

