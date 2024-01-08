const AuthModel = new (require('../Models/Auth.Models'))();
const jwt = require('jsonwebtoken');

class AuthController {
    async signup(req, res) {
        try {
            const { email } = req.body;
            const userExist = await AuthModel.getUser({ email });

            if (userExist)
                return res.handler.forbidden('VALIDATION.EXISTS.USER');

            const user = await AuthModel.createUser(req.body);

            delete user.dataValues.password;

            res.handler.created(user, 'USER.CREATED');
        } catch (err) {
            res.handler.serverError(err);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await AuthModel.getUser({ email });

            if (!user) return res.handler.unauthorized('Invalid Credentials');

            const check_pass = AuthModel.comparePassword(
                password,
                user.password
            );

            if (!check_pass)
                return res.handler.unauthorized('Invalid Credentials');

            const authToken = jwt.sign({ user }, process.env.SECRETKEY);

            await AuthModel.createUserToken(user.id, authToken);

            const data = {
                user,
                authToken,
            };

            res.handler.success(data, 'Login Successfully');
        } catch (err) {
            res.handler.serverError(err);
        }
    }
}

module.exports = AuthController;
