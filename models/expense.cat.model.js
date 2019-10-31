const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

const ExpenseCategorySchema = new Schema({
    cat_id: Number,
    cat_code: Number,
    cat_desc: String
},
{
    collection: 'expensecategory'
}
);

//Auto Increment Category ID
ExpenseCategorySchema.plugin(autoIncrement, {inc_field: 'cat_id'}); 

//Export Module Schema
module.exports = mongoose.model('Category', ExpenseCategorySchema);
