const jwtFactory = require('../core/JWTFactory');
const Kernel = require('../kernel');
const jwtScopes = Kernel.jwtScopes;

function validateRead(request, response, next) {
    let headers = request.headers;
    validateApiRequest(headers, jwtScopes.READ)
        .then(token => {
            next()
        })
        .catch(err => {
            console.error(err);
            response.status(403).json({ err: ['forbidden'] })
        })
}


function validateWrite(request, response, next) {
    let headers = request.headers;
    validateApiRequest(headers, jwtScopes.WRITE)
        .then(token => {
            next()
        })
        .catch(err => {
            console.error(err);
            response.status(403).json({ err: ['forbidden'] })
        })
}

function validateApiRequest(headers, scope) {
    return new Promise((resolve, reject) => {
        if (!isValidHeaders(headers)) {
            reject(new Error("Invalid Headers"))
        } else {
            let token = headers.authorization.replace("Bearer ", "");
            jwtFactory.verify(token, scope)
                .then(resolve)
                .catch(reject)
        }
    })
}

function isValidHeaders(headers) {
    return headers !== undefined
        && isValidAuthorizationHeader(headers.authorization);
}

function isValidAuthorizationHeader(authorizationHeader) {
    if (!authorizationHeader) {
        return false
    }
    if (!authorizationHeader.indexOf("Bearer ") === 0) {
        return false
    }
    let token = authorizationHeader.replace("Bearer ", "");
    return token.length > 0;
}

module.exports = {
    validateRead,
    validateWrite,
};