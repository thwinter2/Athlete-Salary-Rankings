const router = require('express').Router();
const Team = require('../models/team');

router.route('/teams').get((req, res) => {
  Team.find()
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/teams/add').post((req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const abbreviation = req.body.abbreviation;
  const players = req.body.players;

  const newTeam = new Team({
    name,
    location,
    abbreviation,
    players
  });

  newTeam.save()
  .then(() => res.json('Team Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/teams/:id').get((req, res) => {
  Team.findById(req.params.id)
  .then(team => res.json(team))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/teams/:id').delete((req, res) => {
  Team.findByIdAndDelete(req.params.id)
  .then(() => res.json('Team deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/teams/update/:id').post((req, res) => {
  Team.findById(req.params.id)
  .then(team => {
    team.name = req.body.name;
    team.location = req.body.location;
    team.abbreviation = req.body.abbreviation;
    team.players = req.body.players;
  
    team.save()
    .then(() => res.json('Team updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
  });

module.exports = router;