const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registeredEntitySchema = new Schema({
    id: { type: String },
    name: { type: String }
});

const eventSchema = new Schema({eventNo: {type: String,required: true//backend validation
    },

    eventName: {type: String,require: true,},

    eventPlace: {type: String,require: true,},

    eventDetails: {type: String,require: true,},

    eventDate: {type: String,require: true,},

    eventStatus: { type: String, require: true, default: "OPEN"},

    registeredEntities: { type: [registeredEntitySchema], required: false }
});
const event = mongoose.model("event", eventSchema);
module.exports = event; //export...................
