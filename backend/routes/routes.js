const router = require('express').Router();
const teamsController = require('../controllers/teams.controller');

router.get('/teams', teamsController.getTeams);

router.post('/team/create', teamsController.createTeam);

router.get('/team/:id', teamsController.getTeam);

router.put('/team/:id', teamsController.updateTeam);



  newTeam.save()
  .then(() => res.json('Team Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Team.findById(req.params.id)
  .then(team => res.json(team))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/:id').delete((req, res) => {
  Team.findByIdAndDelete(req.params.id)
  .then(() => res.json('Exercise deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/update/:id').post((req, res) => {
  Team.findById(req.params.id)
  .then(team => {
    team.name = req.body.name;
    team.location = req.body.location;
    team.abbreviation = req.body.abbreviation;
    team.players = req.body.players;
  
    team.save()
    .then(() => res.json('Exercise updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
  });

module.exports = router;