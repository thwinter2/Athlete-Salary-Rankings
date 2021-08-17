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
        let playerContracts = [];
        let totalCurrentSalary = 0;
        let displayTotalCurrentSalary = '';
        let totalCareerEarnings = 0;
        let displayTotalCareerEarnings = '';
        Player.find({'college.id': college.id})
        .then(players => {
          players.forEach(player => {
            playerContracts.push(player.contracts);
            totalCurrentSalary += player.contracts[0].salary;
            totalCareerEarnings += player.careerEarnings;
          })
        })
        .then(() => {
          console.log('here')
          displayTotalCurrentSalary = formatter.format(totalCurrentSalary);
          displayTotalCareerEarnings = formatter.format(totalCareerEarnings);
          console.log(displayTotalCareerEarnings);
          console.log(`College: ${college.displayName}  Total Earnings: ${displayTotalCareerEarnings}`);
          college.playerContracts = playerContracts;
          college.totalCurrentSalary = totalCurrentSalary;
          college.displayTotalCurrentSalary = displayTotalCurrentSalary;
          college.totalCareerEarnings = totalCareerEarnings;
          college.displayTotalCareerEarnings = displayTotalCareerEarnings;
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