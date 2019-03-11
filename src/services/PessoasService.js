import apiRequest from '@/helpers/apiRequest.js'

export default {
    cadastrar(data) {
        var formData = new FormData();

        formData.append('nome', data.nome);
        formData.append('cpf', data.cpf);
        formData.append('email', data.email);
        formData.append('tipoPessoa', data.tipoPessoa);
        if (data.numeroCelular != null) formData.append('arquivo', data.numeroCelular);
        formData.append('login', data.login);
        formData.append('senha', data.senha);
        console.log(data.arquivo);
        
        if (data.arquivo != null) formData.append('arquivo', data.arquivo);

        return apiRequest.upload('/Pessoas/Cadastrar', formData);
    },
    detalhes(idPessoa) {
        return apiRequest.post('/Pessoas/Detalhes', {
            idPessoa: idPessoa
        });
    }
}