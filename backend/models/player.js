
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  birthPlace: {
    city: {type: String, required: true },
    state: {type: String},
    country: {type: String, required: true }
  },
  college: {
    mascot: {type: String},
    name: {type: String},
    abbrev: {type: String}
  },
  league: {type: Schema.Types.ObjectId, ref: 'League'},
  team: {type: Schema.Types.ObjectId, ref: 'Team'},
  jersey: {type: Number, required: true},
  position: {
    name: {type: String},
    abbreviation: {type: String}
  },
  contracts: {type: Array, required: true}
}, {
  timestamps: true,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;