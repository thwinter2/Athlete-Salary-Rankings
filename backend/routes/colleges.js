const router = require('express').Router();
const College = require('../models/college');

router.route('/').get((req, res) => {
  College.find()
    .then(colleges => res.json(colleges))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const espnID = req.body.espnID;
  const mascot = req.body.mascot;
  const name = req.body.name;
  const abbreviation = req.body.abbreviation;

  const newCollege = new College({
    espnID,
    mascot,
    name,
    abbreviation,
  });

  newCollege.save()
  .then(() => res.json('College Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  College.findById(req.params.id)
  .then(college => res.json(college))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/:id').delete((req, res) => {
  College.findByIdAndDelete(req.params.id)
  .then(() => res.json('College deleted.'))
  .catch(err => res.status(400).json('Error: ' + err))
  });
  
router.route('/update/:id').post((req, res) => {
  College.findById(req.params.id)
  .then(college => {
    college.espnID = req.body.espnID;
    college.mascot = req.body.mascot;
    college.name = req.body.name;
    college.abbreviation = req.body.abbreviation;
  
    college.save()
    .then(() => res.json('College updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
  });

module.exports = router;