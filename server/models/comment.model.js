const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    email: {type: String, required: true, max: 100},
    content: {type: String, required: true, max: 200},
    rating: {type: Number, required: true},
    hidden: {type: Boolean, required: false},
    item_id: {type: String, required: true},
 
});


// Export the model
module.exports = mongoose.model('Comment', CommentSchema);