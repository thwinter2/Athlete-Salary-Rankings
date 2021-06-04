const router = require('express').Router();
const {Team} = require('../models/team');
const League = require('../models/league');
const {getTeam, getTeamsOfLeague, getLeague} = require("../espn.js");
const {links, teams} = require("../globals.js");

router.route('/').get((req, res) => {
  Team.find()
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const location = req.body.location;
  const name = req.body.name;
  const abbreviation = req.body.abbreviation;
  // const players = req.body.players;

  const newTeam = new Team({
    // id,
    // uid,
    // slug,
    // location,
    // name,
    // abbreviation,
    // displayName,
    // shortDisplayName,
  });

  newTeam.save()
  .then(() => res.json('Team Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/nba').get((req, res) => {
Team.find({uid: /s:40~l:46~.*/})
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/nba/add-all').get(async (req, res) => {
  let newTeams = [];
  let importedTeams = await getTeamsOfLeague('NBA');
  for(let singleTeam of importedTeams){
    newTeams.push(singleTeam.team);
  }
  Team.collection.insertMany(newTeams)
  .then(() => res.json('All NBA Teams Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/league/nba/add-all').get(async (req, res) => {
  let newTeams = [];
  let importedTeams = await getTeamsOfLeague('NBA');
  for(let singleTeam of importedTeams){
    newTeams.push(singleTeam.team);
  }
  League.findOne({abbreviation: 'NBA'})
    .then(result => {
      newTeams.forEach(newTeam => {
        newTeam.league = result._id;
      })
      result.teams = newTeams
      return newTeams;
    })
    .then(newTeams => {
      Team.collection.insertMany(newTeams)
    })
    // .then(Team.find().populate('league').exec())
    .then(() => res.json('All NBA Teams Added!'))
    .catch(err => res.status(400).json('Error: ' + err));

  const league = await League.collection.findOne({abbreviation: 'NBA'});
  await league.populate('teams').execPopulate();
});

// router.route('/add-all').get(async (req, res) => {
//   let newTeams = [];
//   Object.keys(teams).forEach(async (key) => {
//     for(let team of teams[key]){
//       newTeams.push(await getTeam(key, team));
//     }
//   })
//   Team.collection.insertMany(newTeams)
//   .then(() => res.json('All Teams Added!'))
//   .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/add-all').get(async (req, res) => {
  let newTeams = [];
  for(let league of Object.keys(links)){
    let importedTeams = await getTeamsOfLeague(league);
    for(let singleTeam of importedTeams){
      newTeams.push(singleTeam.team);
    }
  }
  Team.collection.insertMany(newTeams)
  .then(() => res.json('All Teams Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Team.findById(req.params.id)
  .then(team => res.json(team))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/:id').delete((req, res) => {
  Team.findByIdAndDelete(req.params.id)
  .then(() => res.json('Team deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/update/:id').post((req, res) => {
  Team.findById(req.params.id)
  .then(team => {
    team.name = req.body.name;
    team.location = req.body.location;
    team.abbreviation = req.body.abbreviation;
      
    team.save()
    .then(() => res.json('Team updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
  });

module.exports = router;