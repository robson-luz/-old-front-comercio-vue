import  apiRequest from '@/helpers/apiRequest.js'

export default {
    cadastrar(data) {
        return apiRequest.post('/Pedidos/CadastrarPedido', data)
    },
    daPessoa(idPessoa) {        
        return apiRequest.post('/Pedidos/DaPessoa', { idPessoa: idPessoa } );
    }
}