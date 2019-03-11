import SessoesService from "@/services/SessoesService";
import {
    router
} from '@/helpers/router';

import { usuarioOnline } from "@/helpers/usuarioOnline";

export const storeApp = {
    state: {
        info: "",
        errosLogin: [],
        iniciarSessao(usuario, senha) {
            SessoesService.autenticar(usuario, senha)
                .then(response => {

                    // $cookies.set('usuarioComercio', response.usuario);
                    usuarioOnline.state.setar(response.usuario);
                    usuarioOnline.state.token(response.usuario.token);

                    router.push('/Comercio/Home');
                })
                .catch(e => {
                    this.errosLogin = e.response.data.value.errorMessage;
                });
        },
        finalizarSessao() {
            // $cookies.remove('usuarioComercio');
            usuarioOnline.state.resetar();

            router.go('/Login');
        },
        manterSessao() {
            SessoesService.manterSessao()
                .then(response => {
                    usuarioOnline.state.setar(response.usuario);
                })
        },
    }
};