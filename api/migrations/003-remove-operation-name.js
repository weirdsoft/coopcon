const mongoose = require('mongoose')

module.exports = {
  name: '003-remove-operation-name',

  up() {
    return mongoose.connection.db.collection('operations').updateMany(
      {},
      { $unset: { name: true } },
    )
  },

  down() {
    return mongoose.connection.db.collection('operations').updateMany(
      {},
      { $set: { name: '' } },
    )
  },
}
