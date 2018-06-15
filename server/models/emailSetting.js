const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// model definition
const emailSettingSchema = new Schema({
  from: { type: String },
  to: { type: String },
  subject_text: { type: String }, 
  created_date: { type: Date },
  updated_date: { type: Date, default: Date.now }  
});

// Create the model class
const ModelClass = mongoose.model('email_setting', emailSettingSchema);

// Export the model
module.exports = ModelClass;
