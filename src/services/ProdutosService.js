import  apiRequest from '@/helpers/apiRequest.js'

export default {
    todos() {
        return apiRequest.get('/Produtos/Todos')
    },
    cadastrados(data) {
        return apiRequest.post('/Produtos/Cadastrados', data)
    },
    salvar(data) {
        var formData = new FormData();

        formData.append('idProduto', data.idProduto);
        formData.append('descricao', data.descricao);
        formData.append('preco', data.preco);
        formData.append('idCategoria', data.idCategoria);
        console.log(data.arquivo);
        
        if (data.arquivo != null) formData.append('arquivo', data.arquivo);

        if (data.idProduto != null)
            return apiRequest.upload('/Produtos/Atualizar', formData);
        else
            return apiRequest.upload('/Produtos/Cadastrar', formData);
    },
    remover(data) {
        return apiRequest.post('/Produtos/Remover', data)
    }
}