require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB Atlas connection...');
console.log('Connection string:', process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  });
