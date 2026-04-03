/**
 * Service to handle health check business logic.
 * Service's responsibility: Handle all business logic, data manipulation, and DB queries.
 */
exports.getHealthStatus = () => {
  // Normally, you would check DB connection status, Redis availability, etc.
  return {
    status: 'UP',
    timestamp: new Date().toISOString()
  };
};
