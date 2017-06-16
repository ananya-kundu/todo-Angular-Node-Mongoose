var mongoose = require("mongoose");

var db = "mongodb://localhost/RegisterLoginDatabase";

module.exports = {"secret":"ananya123",
                  "algorithm":"aes-256-ctr",
                  "password" : "d6F3Efeq",
                  "TOKEN_SECRET" : process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',
                    "FACEBOOK_SECRET": process.env.FACEBOOK_SECRET || 'f4b85480dbfe6e4802a2ba7f3ae0362c',
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

                // $authProvider.facebook({
                //   name: 'facebook',
                //   url: '/auth/facebook',
                //   // authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                //   // redirectUri: window.location.origin + '/',
                //   // requiredUrlParams: ['display', 'scope'],
                //   // scope: ['email'],
                //   // scopeDelimiter: ',',
                //   // display: 'popup',
                //   // oauthType: '2.0',
                //   // popupOptions: { width: 580, height: 400 }
                // });
