export function authHeader() {
    // returna o header de autorização com o token jwt
    let token = $cookies.get('tokenComercioCore');

    if (token) {
        return 'Bearer ' + token;
    } else {
        return {};
    }
}