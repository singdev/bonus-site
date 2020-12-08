const router = require('express').Router();

const UserRepo = require('../../../adapter/storage/repository/AdminMongoRepo');
const adminAuthController = require('../../../adapter/controller/adminAuthController');

const Bcrypt = require('../../../adapter/security/Bcrypt');

const bcrypt = new Bcrypt();

const userRepo = new UserRepo();

router.post("/login", adminAuthController.authenticateUserAndGenerateAccessToken);

router.post("/", async (req, res, next) => {
    if(r){
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;