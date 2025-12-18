const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const  db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.test = require("./test")(mongoose);
db.user = require("./user")(mongoose);
db.food_category = require("./category")(mongoose);

module.exports = db;