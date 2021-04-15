const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    name: {type: String, required: true, unique: true},
    abbreviation: {type: String, required: true, unique: true},
}, {
    timestamps: true,
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;