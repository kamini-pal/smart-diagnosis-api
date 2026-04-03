const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const healthRoutes = require('./routes/health.routes');
const diagnosisRoutes = require('./routes/diagnosis.routes');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

const path = require('path');

// Set up middlewares - Helmet for security headers, Cors for cross-origin, Morgan for logging
app.use(helmet({ contentSecurityPolicy: false })); // Disabled CSP temporarily to allow inline HTML UI scripts to execute
app.use(cors());
app.use(morgan('dev'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes
app.use('/api/v1/health', healthRoutes);
app.use('/', diagnosisRoutes);

// Professional Root Welcome Route for Evaluators/HR
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Smart Diagnosis AI API",
        instructions: "This is a pure Backend API deployment. Please use an API client like Postman to interact with the endpoints.",
        endpoints: {
            health_check: "GET /api/v1/health",
            submit_symptoms: "POST /diagnose (Requires JSON body: { symptoms })",
            fetch_history: "GET /history (Fetches past diagnoses)"
        }
    });
});

// Catch-all unhandled route
app.all('*', (req, res, next) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
