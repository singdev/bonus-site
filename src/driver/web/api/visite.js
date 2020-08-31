const router = require('express').Router();

const VisiteRepo = require('../../../adapter/storage/repository/VisiteMongoRepo');
const CreateVisite = require('../../../application/use_case/CreateVisite');
const GetAllVisite = require('../../../application/use_case/GetAllVisite');

const adminAuthController = require('../../../adapter/controller/adminAuthController');

const visiteRepo = new VisiteRepo();

router.get("/",  adminAuthController.verifyAccessToken, async (req, res, next) => {
    const r = await GetAllVisite(visiteRepo);
    if(r){
        res.send(r);
    } else {
        res.sendStatus(500);
    }
});

router.post("/", async (req, res, next) => {
    const r = await CreateVisite(req.body, visiteRepo);
    if(r){
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;