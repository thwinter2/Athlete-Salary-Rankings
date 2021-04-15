const router = require('express').Router();
const Position = require('../models/position');

router.route('/positions').get((req, res) => {
  Exercise.find()
    .then(positions => res.json(positions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/positions/add').post((req, res) => {
  const name = req.body.name;
  const abbreviation = req.body.abbreviation;

  const newPosition = new Position({
    name,
    abbreviation,
  });

  newPosition.save()
  .then(() => res.json('Position Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/positions/:id').get((req, res) => {
  Position.findById(req.params.id)
  .then(position => res.json(position))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/positions/:id').delete((req, res) => {
  Position.findByIdAndDelete(req.params.id)
  .then(() => res.json('Exercise deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/positions/update/:id').post((req, res) => {
  Position.findById(req.params.id)
  .then(position => {
    position.name = req.body.name;
    position.location = req.body.location;
    position.abbreviation = req.body.abbreviation;
    position.players = req.body.players;
  
    position.save()
    .then(() => res.json('Exercise updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
  });

module.exports = router;