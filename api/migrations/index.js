/* eslint-disable no-console */
const mongoose = require('mongoose')
const migrations = [
  require('./001-product-minimal-fraction'),
  require('./002-add-paid-field-to-order'),
  require('./003-remove-operation-name'),
  require('./004-remove-product-quantity'),
]

// migration schema
const MigrationSchema = mongoose.Schema({
  name: { type: String, required: true },
})

const Migration = mongoose.model('Migration', MigrationSchema)

// connect to mongo
mongoose.Promise = Promise
const connectionPromise = mongoose.connect(process.env.MONGO_URL)

// wait for the connection and run the migrations
console.log('Waiting for connection...')
connectionPromise.then(() => {
  console.log('Connection successfull, about to run the migrations:')

  return migrations.reduce((previousMigrationPromise, migration) =>
    previousMigrationPromise.then(() =>
      Migration.findOne({ name: migration.name }).then((result) => {
        // if the migration was not run yet, implement it and create the migration model
        if (result == null) {
          console.log('- Running migration ' + migration.name)

          return migration.up().then(() => Migration.create({ name: migration.name }))
        } else {
          console.log('- Migration ' + migration.name + ' already applied')
        }
      }),
    ),
  Promise.resolve())
}).then(() => mongoose.disconnect())
