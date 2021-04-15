const router = require('express').Router();
const League = require('../models/league');

router.route('/leagues').get((req, res) => {
  Exercise.find()
    .then(leagues => res.json(leagues))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/leagues/add').post((req, res) => {
  const name = req.body.name;
  const abbreviation = req.body.abbreviation;

  const newLeague = new League({
    name,
    abbreviation,
  });

  newLeague.save()
  .then(() => res.json('League Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/leagues/:id').get((req, res) => {
  League.findById(req.params.id)
  .then(league => res.json(league))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/leagues/:id').delete((req, res) => {
  League.findByIdAndDelete(req.params.id)
  .then(() => res.json('Exercise deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/leagues/update/:id').post((req, res) => {
  League.findById(req.params.id)
  .then(league => {
    league.name = req.body.name;
    league.location = req.body.location;
    league.abbreviation = req.body.abbreviation;
    league.players = req.body.players;
  
    league.save()
    .then(() => res.json('Exercise updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
  });

module.exports = router;