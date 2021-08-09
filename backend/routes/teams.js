const router = require('express').Router();
const {Team} = require('../models/team');
const {League} = require('../models/league');

router.route('/').get((req, res) => {
  Team.find()
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/league/:league').get((req, res) => {
  League.findOne({abbreviation: req.params.league})
  .then((league) => {
    console.log(league);
    Team.find({league: league._id})
      .then(teams => res.json(teams))
      .catch(err => res.status(400).json('Error: ' + err));
  })
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

module.exports = router;