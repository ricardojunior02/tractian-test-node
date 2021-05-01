const { connect } = require('mongoose');

module.exports = connect(process.env.URL_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})