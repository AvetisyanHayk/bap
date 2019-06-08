function verify(request, response, next) {
    if (isValidCSRFToken(request)) {
        next();
    } else {
        response.status(440).end();
    }
}

function isValidCSRFToken(request) {
    let csrfToken = request.body.csrfToken;
    if (!csrfToken || csrfToken.length === 0) {
        return false
    }
    return csrfToken.trim() === request.session.csrfToken;
}

module.exports = verify;