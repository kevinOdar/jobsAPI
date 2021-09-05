const express = require('express');

const router = express.Router();

const { register, login } = require('../controllers/auth');

router.route('/register').get(register);
router.route('/login').get(login);

module.exports = router;
