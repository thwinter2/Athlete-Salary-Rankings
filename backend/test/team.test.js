const mongoose = require('mongoose');
const TeamModel = require('../models/team');
const playerModel = require('../models/player');
const collegeModel = require('../models/college');
const leagueModel = require('../models/league');
const positionModel = require('../models/position');

const emptyTeamData = {
  name: 'Hawks',
  location: 'Atlanta',
  abbreviation: 'ATL'
};

const playerData = {
  espnID: '1',
  firstName: 'Devonte',
  lastName: 'Graham',
  birthPlace: {
    city: 'Raleigh',
    state: 'NC'
  },
  jerseyNumber: 4,
};

const collegeData = {
  espnID: '12',
  mascot: 'Jayhawks',
  name: 'Kansas',
  abbreviation: 'KU'
};

const playersTeamData = {
  name: 'Hornets',
  location: 'Charlotte',
  abbreviation: 'CHA',
  players: [{
    espnID: '1',
    firstName: 'Devonte',
    lastName: 'Graham',
    birthPlace: {
      city: 'Raleigh',
      state: 'NC'
    },
  }]
}


describe('Team Model Test')