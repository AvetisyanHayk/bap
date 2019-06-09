const path = require('path');
const fs = require('fs');

const Kernel = require('../kernel');

function usernames() {
    return new Promise((resolve, reject) => {
        fs.readdir(Kernel.usersDir, (err, usernames) => {
            if (!err) {
                resolve(usernames)
            } else {
                reject(err)
            }
        })
    })
}

function find(username) {
    return new Promise((resolve, reject) => {
        let file = filename(username);
        fs.readFile(file, (err, data) => {
            if (!err) {
                let user = JSON.parse(data);
                user.name = username;
                resolve(user)
            } else {
                reject(err)
            }
        })
    })
}

function update(user) {
    return new Promise((resolve, reject) => {
        let file = filename(user.name);
        fs.writeFile(file, JSON.stringify(user), (err) => {
            if (!err) {
                resolve(user)
            } else {
                reject(err)
            }
        })
    })
}

function filename(username) {
    return path.join(Kernel.usersDir, username);
}

function init() {
    let user = {
        email: "hayk@example.com"
    };
    let username = "hayk";
    fs.writeFileSync(filename(username), JSON.stringify(user));
}

module.exports = {
    find,
    usernames,
    update,
    init,
}