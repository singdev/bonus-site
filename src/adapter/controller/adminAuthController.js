const AuthUser = require('../../application/use_case/AuthentifyUser');
const GetToken = require('../../application/use_case/GenerateAccessToken');
const JWTAccessToken = require('../security/JWTAccessToken');
const Crypto = require('../security/Bcrypt');
const GetTokenData = require('../../application/use_case/GetTokenData');

const UserRepo = require('../../adapter/storage/repository/AdminMongoRepo');

module.exports = {

    async authenticateUserAndGenerateAccessToken(req, res, next) {
        if (!req.body.password || !req.body.identifiant) {
            res.sendStatus(401);
            return;
        }
        try {
            const userRepository = new UserRepo();
            const accessToken = new JWTAccessToken();
            const crypto = new Crypto();

            console.log(req.body);
            const user = await AuthUser(req.body.identifiant, req.body.password, userRepository, crypto);
            if (user) {
                const token = await GetToken(user, accessToken);
                res.send(token);
            } else {
                res.sendStatus(401);
            }
        } catch (err) {
            console.log(err);
            res.sendStatus(403);
        }
    },

    async verifyAccessToken(req, res, next) {
        try {
            const token = req.headers["authorization"].split(" ")[1];
            console.log(token);

            const decoded = await GetTokenData(token, new JWTAccessToken());
            console.log(decoded);
            req.auth = {
                credentials: decoded,
                artifact: { token }
            }
            next()
        } catch (error) {
            console.log(error);
            res.sendStatus(401);
        }
    }
}