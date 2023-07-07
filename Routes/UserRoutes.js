const express = require('express');
const passport = require('passport');
const { Register, Login } = require('../Controllers/UserControllers');


const router = express.Router();

router.post('/Register', Register)
router.post('/Login', Login)
router.get('/profile', passport.authenticate('bearer', { session: false }), (req, res) => {
    res.send(req.user)
})


module.exports = router;