const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'playList',
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export { connectDB, closeDB };
