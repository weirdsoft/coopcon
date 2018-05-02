const mongoose = require('mongoose')

module.exports = {
  name: '004-remove-product-quantity',

  up() {
    return mongoose.connection.db.collection('products').updateMany(
      {},
      { $unset: { quantity: true } },
    )
  },

  down() {
    return mongoose.connection.db.collection('products').updateMany(
      {},
      { $set: { quantity: 1 } },
    )
  },
}
