const mongoose = require('mongoose');
const db_connect = mongoose.connect("mongodb://localhost:27017/location")
.then(()=> { console.log("MongoDB connected Successfully");})
.catch(err => { console.log(err);});

module.exports = db_connect;