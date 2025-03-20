const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String ,required:true},
    designation: { type: String, required: true },
    sex: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true,minlength: 6 },
    cNo: { type: String, required: true },

}, {

    timestamps:true
})

module.exports = mongoose.model('Users', UserSchema)
