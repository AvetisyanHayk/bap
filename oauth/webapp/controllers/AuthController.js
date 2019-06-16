const userRepo = require('../repositories/UserRepository');
const jwtFactory = require('../core/JWTFactory');
const queryParser = require('../helper/QueryParser');

function performLogin(request, response) {
    var query = queryParser.parse(request);
    let username = query.username;
    let password = query.password;
    if (isWrongCredentials(username, password)) {
        response.json({ err: ['credentials'] })
    } else {
        userRepo.find(username)
            .then(user => {
                let token = jwtFactory.create(username, 'read write');
                console.log(token);
                response.json(token);
            })
            .catch(err => {
                console.error(err);
                response.json({ err: ['username'] });
            })
    }
}

function isWrongCredentials(username, password) {
    return username !== password
}

module.exports = {
    performLogin,
}