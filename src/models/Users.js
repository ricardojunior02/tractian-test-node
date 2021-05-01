const { Schema, model } = require('mongoose');


const UsersSchema = new Schema({
  name: String,
  email: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: 'companies'
  }
});

const Users = model('users', UsersSchema);


module.exports = Users;