var express = require('express'),
 	  app = express(),
	  bodyParser = require('body-parser');
var connection = require ('./config/config.js');
var morgan = require ('morgan');
var cors = require('cors');
var winston = require('winston');


winston.configure({
    transports: [
        new (winston.transports.File)({
                name  : "info-file",
                filename : 'infofile.log',
                level :'info'
              }),
        new (winston.transports.File)({
                name  : "error-file",
                filename : 'error.log',
                level :'error'
        }),
        new (winston.transports.File)({
                name  : "system-error-file",
                filename : 'systemError.log',
                level :'systemError'
        })
    ]
});

// winston.info("welcome to winstone file");

app.use(bodyParser.urlencoded({ extended: true ,limit:'40MB'}));
app.use(bodyParser.json({limit:'40MB'}));

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(cors());
app.use(require('./controller'));

var port = process.env.PORT || 8081;

app.listen(port,function(){
      connection.mongoconnection();
		  console.log('Server is running on port :: ',+port);
	});
