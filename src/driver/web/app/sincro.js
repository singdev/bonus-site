const router = require('express').Router();

router.get("/", (req, res) => {
    res.render('sincro/login.pug');
});

module.exports = router;