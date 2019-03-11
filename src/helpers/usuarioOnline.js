export const usuarioOnline = {
    state: {
        idUsuario: '',
        idPessoa: '',
        nome: '',
        arquivo: null,
        setar(usuario) {
            this.idUsuario = usuario.idUsuario;
            this.idPessoa = usuario.idPessoa;
            this.nome = usuario.nome;       
            if(usuario.arquivo != null) {
                this.arquivo = "data:image;base64," + usuario.arquivo;   
            }    
        },
        resetar() {
            this.idUsuario = '';
            this.idPessoa = '';
            this.nome = '';
            delete this.arquivo;

            $cookies.remove('tokenComercioCore');
        },
        token(token) {
            if (token) {
                $cookies.set('tokenComercioCore', token);
            }

            return $cookies.get("tokenComercioCore");
        }
    }
}