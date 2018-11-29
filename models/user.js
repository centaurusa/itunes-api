const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const querySchema = new Schema({
    text: { type: String, required: true },
    count: { type: Number, default: 0 }
}, { _id: false })

const userSchema = new Schema({
     queries: [querySchema]
});

module.exports = mongoose.model('User', userSchema);