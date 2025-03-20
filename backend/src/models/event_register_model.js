const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventUser = new Schema({

    name: { type: String, require: true, },

    nic_No: { type: String, require: true, unique: true, },

    email: { type: String, require: true, },
});
const event = mongoose.model("event-registration", eventUser);
module.exports = event; //export...................