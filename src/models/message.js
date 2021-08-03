const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    username: { type: String, required: true},
    msgstring: { type: String, required: true}
});


const Msg = mongoose.model('mensagen',msgSchema);

module.exports = { Msg }