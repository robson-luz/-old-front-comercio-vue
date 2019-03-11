import  apiRequest from '@/helpers/apiRequest.js'

export default {
    todas() {
        return apiRequest.get('/Categorias/Todas')
    },
    cadastradas(data) {
        return apiRequest.post('/Categorias/Cadastradas', data)
    },
    salvar(data) {
        if (data.idCategoria != null)
            return apiRequest.post('/Categorias/Atualizar', data);
        else
            return apiRequest.post('/Categorias/Cadastrar', data);
    },
    remover(data) {
        return apiRequest.post('/Categorias/Remover', data)
    }
}