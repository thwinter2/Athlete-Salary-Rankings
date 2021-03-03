
const mongoose = require('mongoose');
let College = require('./college');
let League = require('./league');
let Team = require('./team');
let Position = require('./position');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  espnID:     {type: String, required: true },
  firstName:  {type: String, required: true },
  lastName:   {type: String, required: true },
  birthPlace: {
    city:   {type: String, required: true },
    state:  {type: String, required: true }
  },
  college:      College._id,
  league:       League._id,
  team:         Team._id,
  jerseyNumber: {type: Number, required: true},
  position:     Position._id,
  contracts:    {type: Array, required: true}
}, {
  timestamps: true,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;