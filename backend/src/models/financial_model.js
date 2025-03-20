const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financialSchema = new Schema({
    name: { type: String ,required:true},
    type: { type: String, required: true },
    date: { type: String, required: true },
    venue: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true },
    
}, {

    timestamps:true
})

module.exports = mongoose.model('Financial', financialSchema)
