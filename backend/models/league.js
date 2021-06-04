const mongoose = require('mongoose');
const {teamSchema} = require('./team.js');

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
  id: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  abbreviation: {type: String, required: true, unique: true},
  shortName: {type: String, unique: true},
  slug: {type: String, required: true, unique: true},
  teams: [{type: Schema.Types.ObjectId, ref: 'Team'}],
}, {
  timestamps: true,
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;