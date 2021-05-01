const { Schema, model } = require('mongoose');


const CompaniesSchema = new Schema({
  name: String,
  units: [
    {
      type: Schema.Types.ObjectId,
      ref: 'units'
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ]
});


const Companies = model('companies', CompaniesSchema);


module.exports = Companies;