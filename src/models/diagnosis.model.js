const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema(
  {
    symptoms: {
      type: String,
      required: [true, 'Symptoms description is required'],
      trim: true,
      minlength: [3, 'Symptoms description must be at least 3 characters long']
    },
    result: {
      type: [{
        condition: { type: String, required: true },
        probability: { type: String, required: true },
        suggested_next_steps: { type: String, required: true }
      }],
      default: []
    }
  },
  {
    // Mongoose will automatically manage `createdAt` and `updatedAt` properties
    timestamps: true 
  }
);

// A model is a wrapper on the Mongoose schema. It provides an interface to the database for creating, querying, updating, deleting records, etc.
const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;
