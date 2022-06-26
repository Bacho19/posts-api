const {body} = require('express-validator');

const registrationValedator = [
    body('email').isEmail(),
    body('fullName').isLength({ min: 4 }),
    body('password').isLength({ min: 5 }),
];

const loginValidator = [
    body('email').isEmail(),
];

module.exports = {
    registrationValedator,
    loginValidator,
}