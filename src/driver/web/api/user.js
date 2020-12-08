const router = require('express').Router();

const UserRepo = require('../../../adapter/storage/repository/UserMongoRepo');
const CreateUser = require('../../../application/use_case/CreateUser');
const UpdateUser = require('../../../application/use_case/UpdateUser.js');
const GetAllUser = require('../../../application/use_case/GetAllVisite');

const adminAuthController = require('../../../adapter/controller/adminAuthController');

const userRepo = new UserRepo();

router.get("/", adminAuthController.verifyAccessToken, async (req, res, next) => {
    const r = await GetAllUser(userRepo);
    if(r){
        res.send(r);
    } else {
        res.sendStatus(500);
    }
});

router.post("/", async (req, res, next) => {
    const r = await CreateUser(req.body, userRepo);
    if(r){
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

router.post("/update/:id", adminAuthController.verifyAccessToken, async (req, res, next) => {
    const r = await UpdateUser(req.params.id, req.body, userRepo);
    if(r){
        res.send(r);
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;