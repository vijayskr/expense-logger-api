/*
    Expense Category Controller API to handle different paths
*/

// Header Declarations
const express = require('express'),
        expCatConroller = express.Router();

let expCatModel = require('../models/expense.cat.model');

//List all the Expense Categories
expCatConroller.route('/').get(function (req, res) {
    var expCatQuery = expCatModel.find();
    var queryParams = req.query;

    expCatQuery.exec(function (err, categories) {
        if(err) {
            res.json({"Success": false });
        }
        else {
            res.json({ "Success": true, "Data": categories});
        }
    });
});

//Get Category by ID
expCatConroller.route('/:id').get(function(req, res) {
   
    let catID = req.params.id;

    expCatModel.findOne({ _id: catID }, function(err, expCat) {
        if(err) {
            res.json({ "Success": false, "Message": "Expense Category not found" });
        }
        else {
            res.json({ "Success": true, "Data": expCat });
        }
    });
});

//Add New Expense Category
expCatConroller.route('/add').post(function (req, res) {
    let expCat = new expCatModel(req.body);
    console.log(req.body);

    expCat.save()
    .then(expCat => {
        res.status(200).json({ "Success": true });
    })
    .catch(err => {
        console.log(err);
        res.status(400).send({ "Success": false,
    "Message": "Error Occured while creating a new expense category in DB" })
        });
});

//Update Expense Category by ID
expCatConroller.route('/edit/:id').post(function(req, res) {
    let catId = req.params.id;

    expCatModel.findOne({ _id: catId }, function(err, expcat) {
        if(!expcat || err) {
            return next(new Error('Expense Category Not Found !'));
        }
        else {
            expcat.cat_id = req.body.cat_id;
            expcat.cat_desc = req.body.cat_desc;
            expcat.cat_code = req.body.cat_code;

            expcat.save().then(expcat => {
                res.json({ "Success": true });
            })
            .catch(err => {
                res.status(400).json({ "Success": false });
            });
        }
    })
});

//Delete Expense Category by Category ID
expCatConroller.route('/delete/:id').delete(function(req, res) {
    let catId = req.params.id;

    expCatModel.find({ _id : catId }).remove(function(err, expCategory) {
        if(err)
            res.json({ "Success": false, "Message": "Expense Category Not Found" });
        else
            res.json({ "Success": true, "Message": "Expense Category has been removed from DB" });
    });
});


module.exports = expCatConroller;