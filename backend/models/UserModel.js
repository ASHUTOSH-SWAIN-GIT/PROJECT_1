const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: string,
        required: true,
        unique: true
    },
    password: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 12,
        unique: true
    },
    


},{timestamps: true});

module.exports = mongoose.model('User', UserSchema);

