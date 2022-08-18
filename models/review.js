const { string } = require('joi');
const mongoose = require('mongoose');
const { schema } = require('./campground');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    }
});


module.exports = mongoose.model("Review", reviewSchema);