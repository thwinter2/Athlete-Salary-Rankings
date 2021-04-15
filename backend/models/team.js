const mongoose = require('mongoose');
let Player = require('./player');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {type: String, required: true, unique: true},
    location: {type: String, required: true, unique: true},
    abbreviation: {type: String, required: true, unique: true},
}, {
    timestamps: true,
});

teamSchema.virtual('players', {
    ref: 'Player',
    localField: '_id',
    foreignField: 'team',
    options: { sort: { lastName: 1 } }
});

teamSchema.set('toObject', {virtuals: true});
teamSchema.set('toJSON', {virtuals: true});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;