// routes/statusRoutes.js
const express = require('express');
const { getStatus } = require('../controllers/statusController');

const router = express.Router();

router.get('/test', getStatus);

module.exports = router;
