const express = require('express');
const router = express.Router();
const healthController = require('../controllers/health.controller');

// Define route for checking health
router.get('/', healthController.checkHealth);

module.exports = router;
