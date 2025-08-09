const bcrypt = require('bcrypt');
const crypto = require('crypto');

function miHash(clave) {
    const ciclos = 10;
    const salt = bcrypt.genSaltSync(ciclos);

    const claveHash = bcrypt.hashSync(clave, salt);

    return claveHash;
}

//Funcion comentada, pero es utilizada para encriptar datos sensibles
/*
function miEncriptado(dato) {
    if (typeof dato !== 'string') {
        throw new TypeError(`El dato a encriptar debe ser una cadena. Recibido: ${typeof dato}`);
    }

    const algoritmo = 'aes-128-gcm';
    const clave = Buffer.from('1234567890123456');
    const iv = crypto.randomBytes(12); 

    const cifrado = crypto.createCipheriv(algoritmo, clave, iv);

    let encriptado = cifrado.update(dato, 'utf8', 'hex');
    encriptado += cifrado.final('hex');
    const tag = cifrado.getAuthTag();

    return {
        encriptado,
        iv: iv.toString('hex'),
        tag: tag.toString('hex')
    };
}
*/

module.exports = {miHash, bcrypt};