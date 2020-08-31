const router = require('express').Router();

router.get("/", (req, res) => {
    res.render('register_prestataire.pug');
});

router.post("/", (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;