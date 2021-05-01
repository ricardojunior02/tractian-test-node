const { Schema, model } = require('mongoose');


const UnitySchema = new Schema({
  name: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: 'companies'
  },
  assets: [{
    type: Schema.Types.ObjectId,
    ref: 'assets'
  }]
});

const Unity = model('units', UnitySchema);


module.exports = Unity;