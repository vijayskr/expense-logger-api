const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

(expCatController = require("./controllers/expensecategory.controller"));

//DB Configuration
const dbConfig = require('./database.config');

mongoose.Promise = global.Promise;

//Express App Creation
const app = express();

//Parse Requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to DB");
}).catch(err => {
    console.log("Coulnt not connect to DB");
    process.exit();
});

//Parse requests of content-type - applicaiton/json
app.use(bodyParser.json());

//Defining a simple route
app.get('/', (req, res) => {
    res.json({ 
        "message": "Welcome to new Express App" 
    });
});

//Routes for the Expense Logger App
mongoose.set("debug", true);

app.use("/expcategory", expCatController);

// Listen to the Requests in specific port
app.listen(3000, () => {
    console.log("Server Running in port 3000");
});
