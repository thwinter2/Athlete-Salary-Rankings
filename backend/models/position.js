const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const positionSchema = new Schema({
    name: {type: String, required: true, unique: true},
    abbreviation: {type: String, required: true}
}, {
    timestamps: true,
});

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;