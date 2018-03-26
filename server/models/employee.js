const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// model definition
const employeeSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  first_name: String,
  last_name: String,
  team: String,
  location: String,
  designation: String,
  supervisor: String,
  previous_companies: String,
  degree: String,
  degree_stream: String,
  degree_colledge: String,
  created_date: { type: Date },
  updated_date: { type: Date, default: Date.now }  
});

// Create the model class
const ModelClass = mongoose.model('employee', employeeSchema);

// Export the model
module.exports = ModelClass;
