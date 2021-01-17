const express = require('express');
const { registerUser, loginUser, getLoggedInUserDetails, authenticate } = require('../controllers/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getMe', authenticate, getLoggedInUserDetails);

module.exports = router;