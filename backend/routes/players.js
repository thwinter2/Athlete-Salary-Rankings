const router = require('express').Router();
const Player = require('../models/player');
const {getAthletes} = require('../espn.js');

router.route('/').get((req, res) => {
  Player.find()
    .then(players => res.json(players))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthPlace = req.body.birthPlace;
  const college = req.body.college;
  const league = req.body.league;
  const team = req.body.team;
  const jersey = req.body.jersey;
  const position = req.body.position;
  const contracts = req.body.contracts;

  const newPlayer = new Player({
    firstName,
    lastName,
    birthPlace,
    college,
    league,
    team,
    jersey,
    position,
    contracts,
  });

  newPlayer.save()
  .then(() => res.json('Player Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/nba').get((req, res) => {
  Player.find({league: 'NBA'})
    .then(players => res.json(players))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/nba/add-all').get(async (req, res) => {
let newPlayers = [];
for(let team of teams.NBA){
  let importedAthletes = await getAthletes(key, team);
  newPlayers.push(...importedAthletes);
}
Player.collection.insertMany(newPlayers)
.then(() => res.json('All NBA Players Added!'))
.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add-all').get(async (req, res) => {
let newPlayers = [];
Object.keys(teams).forEach(async (key) => {
  for(let team of teams[key]){
    let importedAthletes = await getAthletes(key, team);
    newPlayers.push(...importedAthletes);
  }
})
Player.collection.insertMany(newPlayers)
.then(() => res.json('All Players Added!'))
.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
Player.findById(req.params.id)
.then(player => res.json(player))
.catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {
Player.findByIdAndDelete(req.params.id)
.then(() => res.json('Player deleted.'))
.catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/:id').post((req, res) => {
Player.findById(req.params.id)
.then(player => {
  player.espnID = req.body.espnID;
  player.firstName = req.body.firstName;
  player.lastName = req.body.lastName;
  player.birthPlace = req.body.birthPlace;
  player.college = req.body.college;
  player.league = req.body.league;
  player.team = req.body.team;
  player.jersey = req.body.jerseyNumber;
  player.contracts = req.body.contracts;

  player.save()
  .then(() => res.json('Player updated!'))
  .catch(err => res.status(400).json('Error: ' + err))
  })
  .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;