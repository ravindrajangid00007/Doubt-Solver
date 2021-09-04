const User = require('../models/users');

module.exports.profile = function (req, res) {
    return res.render('user_profile', { title: 'user_profile' });
}

module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user_signup', { title: 'user_signup' });
}

module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user_signin', { title: 'user_signin' });
}

module.exports.create = function (req, res) {
    let data = req.body;
    if (data.password != data.confirm_password) {
        console.log("Invalid username or password");
        return res.redirect('back');
    }
    User.findOne({ email: data.email }, (err, user) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!user) {
            User.create(data, (err, user) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("user created successfully");
                return res.redirect('/users/signin');
            });
        } else {
            console.log("user already present");
            return res.redirect('/users/signin');
        }
    });
}

module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();
    return res.redirect('/');
}