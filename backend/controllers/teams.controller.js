const path = require('path');
const Team = require('../models/team');

exports.getTeams = async(req, res) => {
  try {
    const teams = await Team.find()
      .populate('players');
      res.status(200).json({
        success: true,
        message: 'Fetched all teams successfully',
        teams: teams
      });
  } catch(err) {
      res.status(400).json({success: false, message: 'Could not get all Teams'})
  }
};

router.route('/add').post((req, res) => {
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