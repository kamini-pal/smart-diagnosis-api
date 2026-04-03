const healthService = require('../services/health.service');

/**
 * Controller to handle API health check requests.
 * Controller's responsibility: Extract request parameters, call the service layer, and return HTTP response.
 */
exports.checkHealth = (req, res, next) => {
  try {
    const healthStatus = healthService.getHealthStatus();
    
    res.status(200).json({
      success: true,
      data: healthStatus,
      message: 'API is healthy'
    });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};
