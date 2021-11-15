const mongoose = require('mongoose');
const config = require('./default.json');
const db = config.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true});
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;