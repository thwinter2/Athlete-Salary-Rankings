const router = require('express').Router();
const Player = require('../models/player');

router.route('/players').get((req, res) => {
  Exercise.find()
    .then(players => res.json(players))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/players/add').post((req, res) => {
  const espnID = req.body.espnID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthPlace = req.body.birthPlace;
  const college = req.body.college;
  const league = req.body.league;
  const team = req.body.team;
  const jerseyNumber = req.body.jerseyNumber;
  const position = req.body.position;
  const contracts = req.body.contracts;

  const newPlayer = new Player({
    espnID,
    firstName,
    lastName,
    birthPlace,
    college,
    league,
    team,
    jerseyNumber,
    position,
    contracts,
  });

  newPlayer.save()
  .then(() => res.json('Player Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/players/:id').get((req, res) => {
  Player.findById(req.params.id)
  .then(player => res.json(player))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/players/:id').delete((req, res) => {
  Player.findByIdAndDelete(req.params.id)
  .then(() => res.json('Exercise deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/players/update/:id').post((req, res) => {
  Player.findById(req.params.id)
  .then(player => {
    player.espnID = req.body.espnID;
    player.firstName = req.body.firstName;
    player.lastName = req.body.lastName;
    player.birthPlace = req.body.birthPlace;
    player.college = req.body.college;
    player.league = req.body.league;
    player.team = req.body.team;
    player.jerseyNumber = req.body.jerseyNumber;
    player.position = req.body.position;
    player.contracts = req.body.contracts;
  
    player.save()
    .then(() => res.json('Exercise updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
  });

module.exports = router;