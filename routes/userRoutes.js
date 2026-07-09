const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.post('/', userController.saveGoogleUser);
// router.get('/', userController.getUsers);
router.post('/', (req, res, next) => {
	console.log("USER ROUTE HIT");
	next();
}, userController.saveGoogleUser);

module.exports = router;