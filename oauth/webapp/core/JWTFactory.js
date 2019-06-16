const jwt = require('jsonwebtoken');

const Kernel = require('../kernel');
const jwtConfiguration = Kernel.jwtConfiguration;
const jwtScopes = Kernel.jwtScopes;

function create(username, scope) {
    let payload = {
        "sub": username,
        "scope": scope,
    }
    let expiresInMinutes = jwtConfiguration.expiresInMinutes;
    let expiresInSeconds = expiresInMinutes * 60;
    return {
        "access_token": jwt.sign(payload, jwtConfiguration.secret, { expiresIn: expiresInSeconds }),
        "token_type": "Bearer",
        "expires_in": expiresInSeconds * 1000 /* milliseconds */
    };
}

function verify(token, scope) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtConfiguration.secret, (err, decoded) => {
            if (!err) {
                if (!isValidScope()) {
                    reject(new Error("Invalid scope: " + scope))
                } else {
                    resolve(decoded)
                }
            } else {
                reject(err)
            }
        })
    })
}

function isValidScope(token, scope) {
    if (!scope) {
        return true
    }
    if (!Object.values(jwtScopes).includes(scope)) {
        return false
    }
    if (!token.hasOwnProperty("scope")) {
        return false
    }
    let tokenScopes = token.scope.split(" ");
    return tokenScopes.includes(scope);
}

module.exports = {
    create,
    verify,
}