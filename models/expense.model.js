const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

var schemaOptions = {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
};

const ExpenseSchema = mongoose.Schema({
    exp_type: String,
    exp_desc: String,
    exp_date: {
        type: Date,
        default: Date.now
    },
    exp_spent_by: String,
    exp_amount: Number,
    Category: { type: Schema.Types.ObjectId, ref: 'Category'}
}, {
    timestamps: true
},
schemaOptions,
{
    collection: 'expenses'
});

module.exports = mongoose.model('Expense', ExpenseSchema);
