/**
 *Función para validar el token de login, devuelve siempre true
 *
 * @export
 * @param {*} token
 * @returns
 */
export function validateTokenService(token) {
  // will call to a service to check if the token given is valid
  return true;
}
/**
 *Función para obtener el token de login, deuvelve siempre el mismo
 *
 * @export
 * @param {*} username
 * @param {*} password
 * @returns
 */
export function getTokenService(username, password) {
  // will call to a service to return a valid token
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
}
