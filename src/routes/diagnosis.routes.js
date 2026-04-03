const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosis.controller');

// POST /diagnose - Route for submitting new symptoms
router.post('/diagnose', diagnosisController.diagnosePatient);

// GET /history - Route for fetching diagnosis history
router.get('/history', diagnosisController.getDiagnosisHistory);

module.exports = router;
