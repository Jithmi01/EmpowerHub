const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donate = new Schema({
    name: { type: String ,required:true},
    email: { type: String, required: true },
    contact: { type: String, required: true },
    amount: { type: Number, required: true },
    total: { type: Number, required: false },
    status: { type: String, required: false },
    helpGiven: {type: String, required: false },

}

)

module.exports = mongoose.model('Donation', donate)
