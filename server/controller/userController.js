const userServices = require('../services/userServices')

exports.getAllData = (req, res) => {
    var response = {}

    userServices.getAllData((err, data) => {
        if (err) {
            response.status = false;
            response.error = err;
            res.status(404).send(response);
        } else {
            response.status = true;
            response.data = data;
            res.status(200).send(response);
        }
    });
}

exports.logIn = (req, res) => {
    var response = {}

    req.checkBody('email', 'Invalid Email Address').isEmail();
    req.checkBody('password', 'Invalid Password Length').isString().isLength({ min: 6 });

    req.getValidationResult().then(err => {
        if (err.isEmpty()) {
            userServices.logIn(req.body, (err, data) => {
                if (!err) {
                    response.status = true;
                    response.data = data;
                    res.status(200).send(response);
                } else {
                    response.status = false;
                    response.error = err;
                    res.status(400).send(response);
                }
            });
        } else {
            response.status = false;
            response.error = "Invalid Email or Password";
            res.status(422).send(response);
        }
    });
}
