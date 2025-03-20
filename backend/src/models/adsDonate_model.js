const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adsDonate = new Schema({
    name: { type: String ,required:true},
    location: { type: String, required: true },
    smallDes: { type: String, required: true },
    longDes: { type: String, required: true },
    help: { type: String, required: true },
}

)

module.exports = mongoose.model('AdsDonate', adsDonate)
