var mongoose = require("mongoose");

var db = "mongodb://localhost/RegisterLoginDatabase";

module.exports = {"secret":"ananya123",
                  "algorithm":"aes-256-ctr", //This algo is used to change password into hexadecimal format
                  "password" : "d6F3Efeq",
                  TOKEN_SECRET : process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',
                  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'f4b85480dbfe6e4802a2ba7f3ae0362c',   //Secret key for facebook login
                  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'qalNRtQj-ufh_alOL4oufwFx',           //Secret key for google login

                  "mongoconnection": function () {
                      mongoose.connect(db,function(err){
                        if(err) {
                          console.error(err);
                        }
                    });
                    mongoose.connection.once('connected',function(){
                      console.log("connected to Database" );
                    });
                  }
                }

          
