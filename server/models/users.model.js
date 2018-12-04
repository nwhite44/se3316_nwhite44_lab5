const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    email: {type: String, required: true, max: 100},
    accessLevel: {type: Number, required: true},

});


// Export the model
module.exports = mongoose.model('Users', UsersSchema);