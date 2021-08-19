const router = require('express').Router();
const College = require('../models/college');
const Player = require('../models/player');
const { getColleges } = require('../espn');

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

router.route('/').get((req, res) => {
  College.find()
    .then(colleges => res.json(colleges))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').get(async (req, res) => {
  await College.collection.drop()
    .catch();
  let newColleges = await getColleges();
  College.insertMany(newColleges)
  .then(() => {
    College.find()
    .then(colleges => {
      colleges.forEach(college => {
        let contracts = new Map;
        let currentSalary = 0;
        let displayCurrentSalary = '';
        let careerEarnings = 0;
        let displayCareerEarnings = '';
        Player.find({'college.id': college.id})
        .then(players => {
          players.forEach(player => {
            player.contracts.forEach((salary, year, map) => {
              let newSalary = contracts.has(`${year}`) ? contracts.get(`${year}`).salaryNumber + salary.salaryNumber : salary.salaryNumber;
              contracts.set(`${year}`, {salaryNumber: newSalary, salaryString: formatter.format(newSalary)});
            })
            careerEarnings += player.careerEarnings;
          })
        })
        .then(() => {
          // displayCurrentSalary = formatter.format(currentSalary);
          displayCareerEarnings = formatter.format(careerEarnings);
          college.contracts = contracts;
          college.currentSalary = currentSalary;
          college.displayCurrentSalary = displayCurrentSalary;
          college.careerEarnings = careerEarnings;
          college.displayCareerEarnings = displayCareerEarnings;
          college.save()
        })
        .catch(err => console.log('Error ' + err));
      })
    })
  })
  .then(() => res.json('All Colleges Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  College.findOne({id:req.params.id})
  .then(college => res.json(college))
  .catch(err => res.status(400).json('Error: ' + err))
  });

module.exports = router;