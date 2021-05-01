const { Schema, model } = require('mongoose');


const AssetsSchema = new Schema({
  image: String,
  name: String,
  description: String,
  model: String,
  status: {
    type: String,
    default: 'inAlert' | 'inDowntime' | 'inOperation'
  },
  healthscore: Number,
  responsible: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  unity: {
    type: Schema.Types.ObjectId,
    ref: 'units'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'companies'
  }
});

const Assets = model('assets', AssetsSchema);

module.exports = Assets;

