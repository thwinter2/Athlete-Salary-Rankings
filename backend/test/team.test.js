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
    college: "Kansas"
  }]
}


describe('Team Model Test')