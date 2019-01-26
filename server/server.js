const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const app = express();
mongoose.connect(config.database, { useNewUrlParser: true }, err => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected to database.');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

const userRoute = require('./routes/account');
app.use('/api/accounts', userRoute);

app.listen(config.port, err => {
    console.log('Magic happens on port ' + config.port);
});