const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// model definition
const commonSettingSchema = new Schema({
  type: { type: String },
  req_json: { type: String },
  // from: { type: String },
  // to: { type: String },
  // subject_text: { type: String }, 
  created_date: { type: Date },
  updated_date: { type: Date, default: Date.now }  
});

// Create the model class
const ModelClass = mongoose.model('common_setting', commonSettingSchema);

// Export the model
module.exports = ModelClass;
