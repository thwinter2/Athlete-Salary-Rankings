const router = require('express').Router();
const {Player} = require('../models/player');

router.route('/').get((req, res) => {
  Player.find()
  .then(players => res.json(players))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:leagueAbbreviation').get((req, res) => {
  Player.find({leagueName: req.params.leagueAbbreviation})
  .populate('team')
  .exec()
  .then(players => res.json(players))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
Player.findById(req.params.id)
.then(player => res.json(player))
.catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;