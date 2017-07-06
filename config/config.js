var mongoose = require("mongoose");

var db = "mongodb://localhost/RegisterLoginDatabase";
if (process.env.NODE_ENV === "production") {
  db = "mongodb://root:root@ds151062.mlab.com:51062/tododatabase"
}
console.log("d::",db);

module.exports = {
  "secret": "ananya123",
  "algorithm": "aes-256-ctr", //This algo is used to change password into hexadecimal format
  "password": "d6F3Efeq",
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '1c441728f993488493efdf1deae87e8c', //Secret key for facebook login
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'qalNRtQj-ufh_alOL4oufwFx', //Secret key for google login

  "mongoconnection": function() {
    mongoose.connect(db, function(err) {
      if (err) {
        console.error(err);
      }
    });
    mongoose.connection.once('connected', function() {
      console.log("connected to Database");
    });
  }
}
