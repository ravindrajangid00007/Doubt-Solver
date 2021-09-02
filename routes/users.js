const express = require('express');
const router = express.Router();

usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);

module.exports = router;