require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

// Determine port from environment variables or use default
const PORT = process.env.PORT || 3000;

// Catch global unhandled rejections (e.g. unhandled Promise rejections)
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  // In a production app you may want to gracefully shut down the server here
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Graceful shutdown handler
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated.');
  });
});
