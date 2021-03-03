const mongoose = require('mongoose');
const Team = require('./team');

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    name:           {type: String, required: true, unique: true},
    abbreviation:   {type: String, required: true, unique: true},
    teams:          [{type: Schema.Types.ObjectId, ref: 'Team'}]
}, {
    timestamps: true,
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;