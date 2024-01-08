const jwt = require('jsonwebtoken');
const user_tokens = require('../../../Database/Schemas').user_tokens;
module.exports = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            let jwtGetUserDetail = jwt.verify(
                req.headers.authorization,
                process.env.SECRETKEY,
                {
                    algorithm: process.env.ALGORITHM,
                }
            );
            let getUserAuthDetails = await user_tokens.findOne({
                where: {
                    userId: jwtGetUserDetail.user.id,
                    authToken: req.headers.authorization,
                },
            });
            if (getUserAuthDetails) {
                req.authData = jwtGetUserDetail;
                next();
            } else {
                res.handler.unauthorized(
                    'Issues while Authorization, Token does not exist'
                );
            }
        } catch (error) {
            console.log('TCL: exports.authenticationApi -> error', error);
            res.handler.unauthorized('Invalid Token');
        }
    } else {
        res.handler.notFound('Token Not Found');
    }
};
