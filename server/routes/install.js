const express = require('express');
const router = express.Router();
const { handleInstall } = require('../controllers/installController');

router.post('/install', handleInstall);

module.exports = router;