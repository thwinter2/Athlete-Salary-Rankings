
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  espnID: {type: String, required: true },
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  birthPlace: {
    city: {type: String, required: true },
    state: {type: String, required: true }
  },
  college: {type: Schema.Types.ObjectId, ref: 'College'},
  league: {type: Schema.Types.ObjectId, ref: 'League'},
  team: {type: Schema.Types.ObjectId, ref: 'Team'},
  jerseyNumber: {type: Number, required: true},
  position: {type: Schema.Types.ObjectId, ref: 'Position'},
  contracts: {type: Array, required: true}
}, {
  timestamps: true,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;