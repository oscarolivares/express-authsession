/********************** 
  Database config file
***********************/

const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Database is connected');
  } catch (error) {
    console.log('Database connection problem');
    process.exit(1);
  }
}

// Exporting <connect> to instantiate the DB and <mongoose> for MongoStore connection
module.exports = {
  connect,
  mongoose
};
