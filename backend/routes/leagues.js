const router = require('express').Router();
const League = require('../models/league');
const {links, teams, getTeamRosterAbbreviation} = require("../globals.js");
const { getLeague, getAthletes } = require('../espn');
var mongoose = require('mongoose');
var async = require('async');
const {Team} = require('../models/team');
const {Player} = require('../models/player');


router.route('/').get((req, res) => {
  League.find()
    .then(leagues => res.json(leagues))
    .catch(err => res.status(400).json('error: ' + err));
});

router.route('/add').post((req, res) => {
  let name = req.body.name;
  let abbreviation = req.body.abbreviation;
  let teams = req.body.players;

  const newLeague = new League({
    id,
    name,
    abbreviation,
    shortName,
    slug,
    teams,
  });

  newLeague.save()
  .then(() => res.json('League added!'))
  .catch(err => res.status(400).json('error: ' + err));
});

router.route('/add-all').get(async (req, res) => {
  let newLeagues = [];
  for(let league of Object.keys(links)){
    newLeagues.push(await getLeague(league));
  }
  League.collection.insertMany(newLeagues)
  .then(() => res.json('All Leagues Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add-nba').get(async (req, res) => {
  await League.collection.drop();
  await Team.collection.drop();
  await Player.collection.drop();
  await getLeague('NBA')
  .then((league) => {
    let id = league.id;
    let name = league.name;
    let abbreviation = league.abbreviation;
    let shortName = league.shortName;
    let slug = league.slug;
    let teams = [];
    const newLeague = new League({
      id,
      name,
      abbreviation,
      shortName,
      slug,
      teams,
    });
    async.each(league.teams, async (teamData) => {
      let id = teamData.team.id;
      let uid = teamData.team.uid;
      let slug = teamData.team.slug;
      let location = teamData.team.location;
      let name = teamData.team.name;
      let abbreviation = teamData.team.abbreviation;
      let displayName = teamData.team.displayName;
      let shortDisplayName = teamData.team.shortDisplayName;
      let players = [];
      const newTeam = new Team({
        id,
        uid,
        slug,
        location,
        name,
        abbreviation,
        displayName,
        shortDisplayName,
        players,
      });
      let abbrev = await getTeamRosterAbbreviation(newTeam.abbreviation);
      let athletes = await getAthletes('NBA', abbrev);
      async.each(athletes, (playerData, callback) => {
        let id = playerData.id;
        let uid = playerData.uid;
        let firstName = playerData.firstName;
        let lastName = playerData.lastName;
        let birthPlace = playerData.birthPlace;
        let college = playerData.college;
        let jersey = playerData.jersey;
        let position = playerData.position;
        let contracts = playerData.contracts;
        const newPlayer = new Player({
          id,
          uid,
          firstName,
          lastName,
          birthPlace,
          college,
          jersey,
          position,
          contracts,
        });
        newPlayer.save()
        .then(() => {
          newTeam.players.push(newPlayer);
          callback();
        })
      })
      .then(() => {
        newTeam.save()
        .then(() => {
          newLeague.teams.push(newTeam);
        })
      })
    })
    .then(() => {
      newLeague.save()
      .then(() => res.json('NBA League Added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    })
  })
});

router.route('/:id').get((req, res) => {
  League.findbyid(req.params.id)
  .then(league => res.json(league))
  .catch(err => res.status(400).json('error: ' + err))
  });
  
router.route('/:id').delete((req, res) => {
  League.findbyidanddelete(req.params.id)
  .then(() => res.json('League deleted.'))
  .catch(err => res.status(400).json('error: ' + err))
  });
  
router.route('/update/:id').post((req, res) => {
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