const router = require('express').Router();
const Team = require('../models/team');

router.route('/').get((req, res) => {
  Team.find()
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:leagueAbbreviation').get((req, res) => {
  Team.find({leagueName: req.params.leagueAbbreviation})
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Team.findById(req.params.id)
  .then(team => res.json(team))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
module.exports = router;