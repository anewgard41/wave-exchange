const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://musiclover:A4dN2XAcY9UOq2y6@cluster0.ll9kvjn.mongodb.net/?retryWrites=true&w=majority");
// mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://musiclover:A4dN2XAcY9UOq2y6@cluster0.ll9kvjn.mongodb.net/?retryWrites=true&w=majority");

// Prod DB
// process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/musicdb"

// Test DB
// "mongodb+srv://musiclover:A4dN2XAcY9UOq2y6@cluster0.ll9kvjn.mongodb.net/?retryWrites=true&w=majority"

// Remove above comments at final deployment

module.exports = mongoose.connection;