const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// model definition
const bulkEmployeeSchema = new Schema({ 
  name: { type: String },
  user_image: { type: Object },
  created_date: { type: Date },
  updated_date: { type: Date, default: Date.now }  
});

// Create the model class
const ModelClass = mongoose.model('bulkEmployees', bulkEmployeeSchema);

// Export the model
module.exports = ModelClass;
