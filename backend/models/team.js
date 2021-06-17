const mongoose = require('mongoose');
const {playerSchema} = require('./player.js');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    id: {type: String, required: true, unique: true},
    uid: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    location: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    abbreviation: {type: String, required: true, unique: true},
    displayName: {type: String, required: true, unique: true},
    shortDisplayName: {type: String, required: true, unique: true},
    players: [{type: Schema.Types.ObjectId, ref: 'Player'}],
    // color: {type: String, required: true},
    // alternateColor: {type: String, required: true},
    // isActive: {type: Boolean},
    // isAllStar: {type: Boolean},
    // logos: {type: Array, required: true},
}, {
    timestamps: true,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = {Team, teamSchema};