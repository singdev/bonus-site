const router = require('express').Router();

router.get("/", (req, res) => {
    res.render('register_donneur_dordre.pug');
});

module.exports = router;