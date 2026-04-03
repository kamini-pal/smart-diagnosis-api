/**
 * Global Error Handler middleware to centralize all API error formatting
 */
exports.errorHandler = (err, req, res, next) => {
  // Create a shallow copy of the error to modify without mutating the original object
  let error = { ...err };
  error.message = err.message;

  // For debugging backend failures
  if (process.env.NODE_ENV !== 'production') {
      console.error(err);
  }

  // 1. Mongoose Bad ObjectId (`CastError`)
  // Emitted when trying to query the DB with an invalid ID string format
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid ID: ${err.value}`;
    error = { message, statusCode: 404 };
  }

  // 2. Mongoose Duplicate Key Error Code
  // Emitted when a user tries inserting a row that violates a `unique: true` property index
  if (err.code === 11000) {
    const message = 'Duplicate field value entered. Record already exists.';
    error = { message, statusCode: 400 };
  }

  // 3. Mongoose Validation Error
  // Emitted when a schema validation fails (e.g. required field missing or too short)
  if (err.name === 'ValidationError') {
    // Extract all the field-specific error messages and join them beautifully
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  // Determine final status code (default to 500 fatal Internal Server Error)
  const statusCode = error.statusCode || 500;
  
  // Send uniform JSON response back down to the user app
  res.status(statusCode).json({
    success: false,
    error: {
        message: error.message || 'Internal Server Error',
        // Security best practice: Only leak the exact code line stacktrace in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
};
