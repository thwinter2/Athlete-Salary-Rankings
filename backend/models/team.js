const mongoose = require('mongoose');
const {playerSchema} = require('./player.js');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    _id: Schema.Types.ObjectId,
    id: {type: String, required: true, unique: true},
    uid: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    location: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    abbreviation: {type: String, required: true, unique: true},
    displayName: {type: String, required: true, unique: true},
    shortDisplayName: {type: String, required: true, unique: true},
    // color: {type: String, required: true},
    // alternateColor: {type: String, required: true},
    // isActive: {type: Boolean},
    // isAllStar: {type: Boolean},
    // logos: {type: Array, required: true},
    league: {type: Schema.Types.ObjectId, ref: 'League'},
    players: [{type: Schema.Types.ObjectId, ref: 'Player'}],
}, {
    timestamps: true,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = {Team, teamSchema};