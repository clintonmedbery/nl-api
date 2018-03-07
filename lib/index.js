import express from 'express';
const morgan = require('morgan');
const bodyParser = require('body-parser');
import router from './services/router';

var app = express();


console.log("Starting " + process.env.NODE_ENV + ".....");

// if(process.env.MONGO_PRIVATE_IP){
//     console.log("Connecting to Mongo with Private IP");
//
//     var address = 'mongodb://' + process.env.MONGO_INITDB_ROOT_USERNAME + ':' + process.env.MONGO_INITDB_ROOT_PASSWORD + '@' + process.env.MONGO_PRIVATE_IP +':27017/' + process.env.MONGO_DB_NAME;
//     console.log(address);
//     mongoose.connect(address, function(error){
//         if(error) {
//             console.log(error);
//         } else {
//             console.log("Connected to Mongo");
//         }
//     });
// } else if(process.env.MONGO_INITDB_ROOT_USERNAME){
//     console.log("Connecting to Mongo Docker Compose");
//     var address = 'mongodb://' + process.env.MONGO_INITDB_ROOT_USERNAME + ':' + process.env.MONGO_INITDB_ROOT_PASSWORD + '@mongo:27017/' + process.env.MONGO_DB_NAME;
//     console.log(address);
//
//     mongoose.connect(address, function(error){
//         if(error) {
//             console.log(error);
//         } else {
//             console.log("Connected to Mongo");
//         }
//     });
// } else {
//     console.log("Connecting to Mongo Local");
//     mongoose.connect('mongodb://localhost:todoList/todoList');
// }

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/v1', router);

//Need to build this out in a separate file as a possible error handler.
app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        res.status(err.status).send({message:err.message});
        return;
    }
    next();
});

var PORT = process.env.PORT || 3000;
var HOST = process.env.HOST || '0.0.0.0';

//Just a test to make sure shit works
app.get('/hello', function (req, res) {
    console.log("Hello World");
    res.send({hello:'Hello World!'});
});

console.log('Listening on port ', HOST, PORT);
app.listen(PORT, HOST);
