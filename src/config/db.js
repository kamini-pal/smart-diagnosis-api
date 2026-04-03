const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Attempt to connect to the database securely using the URI from our .env file.
    const conn = await mongoose.connect(process.env.DB_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    
    // Exit process with failure (1) if the database fails to connect.
    // The application should not run if it cannot reach its database.
    process.exit(1);
  }
};

module.exports = connectDB;
