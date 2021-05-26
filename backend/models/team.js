const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    _id: Schema.Types.ObjectId,
    location: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    abbreviation: {type: String, required: true, unique: true},
    // players: [{type: Schema.Types.ObjectId, ref: 'Player'}],
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