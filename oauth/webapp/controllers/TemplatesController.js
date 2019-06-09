const repo = require('../repositories/TemplatesRepository');

function get(request, response) {
    let name = request.params.name;
    repo.find(name)
        .then(template => {
            response.json(template);
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ err: ['template'] });
        });
}

module.exports = {
    get,
}