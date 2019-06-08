const userRepo = require('../repositories/UserRepository');

function index(request, response) {
    let data = {
        user: JSON.parse(request.session.user),
        csrfToken: request.session.csrfToken,
    }
    let success = request.session.success;
    if (!(!success)) {
        data.success = success;
        delete request.session.success;
    }
    response.render('index', data);
}

function update(request, response) {
    let user = JSON.parse(request.session.user);
    let username = request.body.username;
    if (user.name !== username) {
        delete request.session.user;
        response.redirect('/auth/login');
    } else {
        user.email = request.body.email;
        userRepo.update(user)
            .then(user => {
                request.session.user = JSON.stringify(user);
                request.session.success = ['update']
                response.redirect('/');
            })
            .catch(err => {
                console.error("IndexController.update() => userRepo.update.catch", err);
                response.render('index', {
                    user,
                    errors: ['update'],
                })
            })
    }
}

module.exports = {
    index,
    update,
}