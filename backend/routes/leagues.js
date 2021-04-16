const router = require('express').Router();
const League = require('../models/league');

router.route('/leagues').get((req, res) => {
  League.find()
    .then(leagues => res.json(leagues))
    .catch(err => res.status(400).json('error: ' + err));
});

router.route('/leagues/add').post((req, res) => {
  const name = req.body.name;
  const abbreviation = req.body.abbreviation;
  const players = req.body.players;

  const newleague = new league({
    name,
    abbreviation,
    players,
  });

  newleague.save()
  .then(() => res.json('League added!'))
  .catch(err => res.status(400).json('error: ' + err));
});

router.route('/leagues/:id').get((req, res) => {
  League.findbyid(req.params.id)
  .then(league => res.json(league))
  .catch(err => res.status(400).json('error: ' + err))
  });
  
router.route('/leagues/:id').delete((req, res) => {
  League.findbyidanddelete(req.params.id)
  .then(() => res.json('League deleted.'))
  .catch(err => res.status(400).json('error: ' + err))
  });
  
router.route('/leagues/update/:id').post((req, res) => {
  League.findbyid(req.params.id)
  .then(league => {
    league.name = req.body.name;
    league.location = req.body.location;
    league.players = req.body.players;
  
    league.save()
    .then(() => res.json('League updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
  });

module.exports = router;