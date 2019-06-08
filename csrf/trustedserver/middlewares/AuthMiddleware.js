function auth(request, response, next) {
    let session = request.session;
    console.log('SESSION:', Date.now());
    if (!session) {
        console.log('NO SESSION:', Date.now());
        response.redirect('/auth/login')
    } else {
        let user = session.user;
        if (!user) {
            console.log('NO USER:', Date.now());
            session.destroy();
            response.redirect('/auth/login')
        } else {
            next();
        }
    }
}

module.exports = auth;