/**
 * Module permettant de gérer l'authentification par email et mot de passe
 * 
 * Crypter le mot de passe avant enregistrement
 * --------
 * Vérification de l'émail et authentification par vérification du mot de passe
 * --------
 * Génération du token et enregistrement dans les cookies
 * --------
 * Ajout des données d'authentification dans la requete Express
 * --------
 */

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = "motdepasse";

module.exports = {

    AuthentificationResult: Object.freeze({ "CONDITION_ERROR": 0, "MDP_ERROR": 1, "AUTH": 2}),

    /**
     * 
     * @param {Object} condition 
     * @param {String} password 
     * @param {mongoose.Model} userModel 
     */
    async auth(condition, password, userModel){
        const user = await userModel.findOne(condition);
        if(user){
            const success = await bcrypt.compare(password, user.password);
            if(success){
                return this.AuthentificationResult.AUTH;
            } else {
                return this.AuthentificationResult.MDP_ERROR;
            }
        } else {
            return this.AuthentificationResult.CONDITION_ERROR;
        }
    },

    async deconnexion(req, res, next){
        res.clearCookie('auth');
        next();
    },

    async closeSession(res){
        res.clearCookie('auth');
    },

    async generateToken(user){
        const uid = user._id;
        return await jwt.sign({ uid }, JWT_SECRET);
    },

    async decodeToken(token){
        return await jwt.verify(token, JWT_SECRET);
    },

    async createSession(email, expressRes, userModel){
        const user = await userModel.findOne({ email});
        const uid = user._id;
        const token = await jwt.sign({ uid }, JWT_SECRET);
        expressRes.cookie("auth", token);
    },

    async createSessionByToken(token, expressRes){
        expressRes.cookie("auth", token);
    },

    async decodeToken(token){
        try {
            if(token){
                const decoded = await jwt.verify(token, JWT_SECRET);
                return decoded;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    /**
     * Express middleware
     * @param {*} req 
     * @param {*} res 
     * @param {*} next
     */
    async verfiySessionToken(req, res, next) {
        try {
            const token = req.cookies.auth;
            if(token){
                const decoded = await jwt.verify(token, JWT_SECRET);

                req.auth = {
                    credentials: decoded,
                    artifact: { token }
                }
            }
            next();
        } catch (error) {
            console.log(error);
            next();
        }
    },
    
    async verifyToken(req, res, next) {
        const authorization = req.headers['authorization'];
        if (authorization) {
            const token = authorization.split(" ")[1];
            try {
                const decoded = await accessToken.decode(token);
                req.auth = {
                    credentials: decoded,
                    artifact: { token }
                }
                next();
            } catch(err){
                next(err);
            }
        } else {
            res.sendStatus(403);
        }
    },

    /**
     * 
     * @param {String} password 
     */
    async encryptPassword(password){
        return await bcrypt.hash(password, 10);
    }
}