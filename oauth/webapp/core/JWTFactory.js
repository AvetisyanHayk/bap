const jwt = require('jsonwebtoken');

const DateUtils = require('../helper/DateUtils');
const Kernel = require('../kernel');
const jwtConfiguration = Kernel.jwtConfiguration;

function create(username, scope) {
    let payload = {
        "sub": username,
        "scope": scope,
    }
    var expiresInMinutes = jwtConfiguration.expiresInMinutes;
    var expiresInSeconds = expiresInMinutes * 60;
    return {
        "access_token": jwt.sign(payload, jwtConfiguration.secret, { expiresIn: expiresInSeconds }),
        "token_type": "Bearer",
        "expires_in": expiresInSeconds * 1000 /* milliseconds */
    };
}

module.exports = {
    create,
}