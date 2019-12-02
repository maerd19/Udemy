const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById, read, update } = require ('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

// See user profile
router.get("/user/:userId", requireSignin, isAuth, read);
// Update user profile
router.put("/user/:userId", /*requireSignin, isAuth,*/ update);

// anytime we find a parameter called userId in the route userById will run and make the user info available in the request object
router.param('userId', userById)

module.exports = router;