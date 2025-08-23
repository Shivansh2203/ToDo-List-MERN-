const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database Connected 😎");
  } catch (error) {
    console.error("❌ Database Connection Failed: " + error);
    process.exit(1); // stop app if DB fails
  }
};

module.exports = connectDB;
