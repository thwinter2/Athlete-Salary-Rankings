const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  // id: {type: String, required: true, unique: true},
  // uid: {type: String, required: true, unique: true},
  // guid: {type: String, required: true, unique: true},
  // alternateIds: {type:Object},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  // fullName: {type: String, required: true},
  // displayName: {type: String, required: true},
  // shortName: {type: String, required: true},
  weight: {type: Number},
  displayWeight: {type: String},
  height: {type: Number},
  displayHeight: {type: String},
  age: {type: Number},
  // dateOfBirth: {type: String},
  // debutYear: {type: Number},
  // links: {type: Array},
  birthPlace: {type: Object
    // city: {type: String, required: true},
    // state: {type: String},
    // country: {type: String, required: true}
  },
  college: {type: Object
    // id: {type: String, required: true},
    // mascot: {type: String, required: true},
    // name: {type: String, required: true},
    // shortName: {type: String, required: true},
    // abbrev: {type: String, required: true},
  },
  // slug: {type: String, required: true},
  headshot: {type: Object
    // href: {type: String, required: true},
    // alt: {type: String, required: true},
  },
  jersey: {type: String},
  // hand: {type: Object},
  position: {     // type: Object
    name: {type: String},
    abbreviation: {type: String},
  },
  // injuries: {type: Array},
  contracts: {type: Array},
  experience: {type: Number},
  league: {type: Schema.Types.ObjectId, ref: 'League'},
  leagueName: {type: String,},
  team: {type: Schema.Types.ObjectId, ref: 'Team'},
  teamName: {type: String,},
  careerEarnings: {type: Number},
  displayCareerEarnings: {type: String},
  displayCurrentSalary: {type: String},
}, {
  timestamps: true,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = {Player, playerSchema};