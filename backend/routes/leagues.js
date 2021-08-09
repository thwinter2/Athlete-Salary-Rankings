const router = require('express').Router();
const {League} = require('../models/league');
const {links, teams, getTeamRosterAbbreviation} = require("../globals.js");
const { getLeague, getAthletes } = require('../espn');
var mongoose = require('mongoose');
var async = require('async');
const {Team} = require('../models/team');
const {Player} = require('../models/player');

async function addLeague(league){
  let id = league.id;
  let name = league.name;
  let abbreviation = league.abbreviation;
  let shortName = league.shortName;
  let slug = league.slug;
  let teams = [];
  const newLeague = new League({
    _id: new mongoose.Types.ObjectId(),
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
    let league = newLeague._id;
    let players = [];
    const newTeam = new Team({
      _id: new mongoose.Types.ObjectId(),
      id,
      uid,
      slug,
      location,
      name,
      abbreviation,
      displayName,
      shortDisplayName,
      league,
      players,
    });
    let rosterAbbreviation = getTeamRosterAbbreviation(newTeam.abbreviation);
    let athletes = await getAthletes('NBA', rosterAbbreviation);
    async.each(athletes, (playerData, callback) => {
      let id = playerData.id;
      let uid = playerData.uid;
      let guid = playerData.guid;
      let alternateIds = playerData.alternateIds;
      let firstName = playerData.firstName;
      let lastName = playerData.lastName;
      let fullName = playerData.fullName;
      let displayName = playerData.displayName;
      let shortName = playerData.shortName;
      let weight = playerData.weight;
      let displayWeight = playerData.displayWeight;
      let height = playerData.height;
      let displayHeight = playerData.displayHeight;
      let age = playerData.age;
      let dateOfBirth = playerData.dateOfBirth;
      let debutYear = playerData.debutYear;
      let links = playerData.links;
      let birthPlace = playerData.birthPlace;
      let college = playerData.college;
      let slug = playerData.slug;
      let headshot = playerData.headshot;
      let jersey = playerData.jersey;
      let hand = playerData.hand;
      let position = playerData.position;
      let injuries = playerData.injuries;
      let contracts = playerData.contracts;
      let experience = playerData.experience.years;
      let league = newTeam.league;
      let team = newTeam._id;
      let earnings = playerData.earnings;
      const newPlayer = new Player({
        id,
        uid,
        guid,
        alternateIds,
        firstName,
        lastName,
        fullName,
        displayName,
        shortName,
        weight,
        displayWeight,
        height,
        displayHeight,
        age,
        dateOfBirth,
        debutYear,
        links,
        birthPlace,
        college,
        slug,
        headshot,
        jersey,
        hand,
        position,
        injuries,
        contracts,
        experience,
        league,
        team,
        earnings,
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
  return newLeague;
}

router.route('/').get((req, res) => {
  League.find()
    .then(leagues => res.json(leagues))
    .catch(err => res.status(400).json('error: ' + err));
});

router.route('/add-all').get(async (req, res) => {
  await League.collection.drop()
    .catch();
  await Team.collection.drop()
    .catch();
  await Player.collection.drop()
    .catch();
  async.forEach(Object.keys(links), (leagueAbbreviation, callback) => {
    await getLeague(leagueAbbreviation)
    .then((league) => {
    let newLeague = await addLeague(league);
    newLeague.save();
    callback();
    });
  })
  .then(() => res.json('All Leagues Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/nba').get(async (req, res) => {
  await League.collection.drop()
    .catch();
  await Team.collection.drop()
    .catch();
  await Player.collection.drop()
    .catch();
  await getLeague('NBA')
  .then((league) => {
    let newLeague = await addLeague(league);
    newLeague.save()
    .then(() => res.json('NBA League Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
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