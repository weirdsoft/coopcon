const mongoose = require('mongoose')

module.exports = {
  name: '001-product-minimal-fraction',

  up() {
    return mongoose.connection.db.collection('products').updateMany(
      {},
      { $set: { minimalFraction: 1 } },
    )
  },

  down() {
    return mongoose.connection.db.collection('products').updateMany(
      {},
      { $unset: { minimalFraction: true } },
    )
  },
}
