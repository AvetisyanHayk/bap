const userRepo = require('../repositories/UserRepository');
const CSRFTokenFactory = require('../core/CSRFTokenFactory');

function login(request, response) {
    renderLogin(response)
}

function performLogin(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    if (isWrongCredentials(username, password)) {
        renderLogin(response, ['credentials'])
    } else {
        userRepo.find(username)
            .then(user => {
                request.session.user = JSON.stringify(user);
                request.session.csrfToken = CSRFTokenFactory.create(request.sessionID);
                response.redirect('/');
            })
            .catch(err => {
                console.error("AuthController.performLogin() => userRepo.find.catch", err);
                response.status(500).end()
            })
    }
}


function performLogout(request, response) {
    let session = request.session;
    if (!(!session)) {
        session.destroy();
    }
    response.redirect('/auth/login')
}

function renderLogin(response, errors) {
    userRepo.usernames()
        .then(usernames => {
            response.render('login', {
                errors,
                usernames,
            })
        })
        .catch(err => {
            console.error("AuthController.login() => userRepo.usernames.catch", err);
            response.status(500).end()
        })
}

function isWrongCredentials(username, password) {
    return username !== password
}

module.exports = {
    login,
    performLogin,
    performLogout,
}