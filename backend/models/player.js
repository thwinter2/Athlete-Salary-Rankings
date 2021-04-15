
const mongoose = require('mongoose');
let College = require('./college');
let League = require('./league');
let Team = require('./team');
let Position = require('./position');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  espnID: {type: String, required: true },
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  birthPlace: {
    city: {type: String, required: true },
    state: {type: String, required: true }
  },
  college: {type: Schema.Types.ObjectId, ref: 'College'},
  league: {type: Schema.Types.ObjectId, ref: 'League', required: true},
  team: {type: Schema.Types.ObjectId, ref: 'Team'},
  jerseyNumber: {type: Number, required: true},
  position: {type: Schema.Types.ObjectId, ref: 'Position'},
  contracts: {type: Array, required: true}
}, {
  timestamps: true,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;