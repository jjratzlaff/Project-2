
const mongoose = require("mongoose");

module.exports = {
  connectDB,
};

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (err) {
    console.log("err");
    console.log(err, ' connecting to mongodb')
    process.exit(1);
  }
}