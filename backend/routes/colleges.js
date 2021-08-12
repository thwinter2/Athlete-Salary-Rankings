const router = require('express').Router();
const College = require('../models/college');
const { getColleges } = require('../espn');

router.route('/').get((req, res) => {
  College.find()
    .then(colleges => res.json(colleges))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').get(async (req, res) => {
  await College.collection.drop()
    .catch();
  let newColleges = await getColleges();
  // console.log(newColleges[0])
  College.insertMany(newColleges)
  .then(() => res.json('All Colleges Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  College.findById(req.params.id)
  .then(college => res.json(college))
  .catch(err => res.status(400).json('Error: ' + err))
  });

module.exports = router;