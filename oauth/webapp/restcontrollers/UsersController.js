const repo = require('../repositories/UserRepository');

function get(request, response) {
    repo.usernames()
        .then(usernames => {
            response.json(usernames)
        })
        .catch(err => {
            console.error("UserController.get() => repo.usernames.catch", err);
            response.status(500).json({ err })
        })
}

function find(request, response) {
    let username = request.params.username;
    repo.find(username)
        .then(user => {
            response.json(user)
        })
        .catch(err => {
            console.error("UserController.login() => repo.find.catch", err);
            response.status(500).json({ err })
        })
}

function update(request, response) {
    console.log(JSON.stringify(request.headers));
    console.log(JSON.stringify(request.headers));
    console.log(JSON.stringify(request.headers));
    console.log(JSON.stringify(request.headers));

    let user = request.body.user;

    console.log("USER", user);
    console.log("USER", user);
    console.log("USER", user);
    console.log("USER", user);
    repo.update(user)
        .then(user => {
            response.json(user)
        })
        .catch(err => {
            console.error("UserController.update() => userRepo.update.catch", err);
            response.json({ errors: ['update'] })
        })
}

module.exports = {
    get,
    find,
    update,
}