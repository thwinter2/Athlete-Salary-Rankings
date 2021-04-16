const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    espnID: {type: String, required: true, unique: true},
    mascot: {type: String, required: true},
    name: {type: String, require: true},
    abbreviation: {type: String, required: true},
    players: [{type: Schema.Types.ObjectId, ref: 'Player'}],
}, {
    timestamps: true,
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;