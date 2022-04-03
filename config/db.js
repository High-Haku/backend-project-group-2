const mongoose = require("mongoose");

const uri = process.env.MONGODBURI;

const db = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = db;