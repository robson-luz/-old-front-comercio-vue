import apiRequest from '@/helpers/apiRequest.js'

export default {
    autenticar(login, senha) {
        return apiRequest.post('/Usuarios/Autenticar', {
            login: login,
            senha: senha
        })
    },
    manterSessao() {
        return apiRequest.post('/Usuarios/ManterSessao')
    }
}