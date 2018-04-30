const mongoose = require('mongoose')

module.exports = {
  name: '002-add-paid-field-to-order',

  up() {
    return mongoose.connection.db.collection('orders').updateMany(
      {},
      { $set: { paid: false } },
    )
  },

  down() {
    return mongoose.connection.db.collection('orders').updateMany(
      {},
      { $unset: { paid: true } },
    )
  },
}
