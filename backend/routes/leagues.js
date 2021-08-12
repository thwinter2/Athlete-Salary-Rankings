const router = require('express').Router();
const {League} = require('../models/league');
const {links} = require("../globals.js");
const { getLeague, getAthletes } = require('../espn');
var mongoose = require('mongoose');
var async = require('async');
const {Team} = require('../models/team');
const {Player} = require('../models/player');

async function addLeague(league, leagueAbbreviation){
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
    let color = teamData.team.color;
    let alternateColor = teamData.team.alternateColor;
    let league = newLeague._id;
    let leagueName = leagueAbbreviation;
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
      color,
      alternateColor,
      league,
      leagueName,
      players,
    });
    let rosterAbbreviation = newTeam.abbreviation;
    let athletes = await getAthletes(leagueAbbreviation, rosterAbbreviation);
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
      let leagueName = leagueAbbreviation;
      let team = newTeam._id;
      let teamName = newTeam.displayName;
      let careerEarnings = playerData.careerEarnings;
      let displayCareerEarnings = playerData.displayCareerEarnings;
      let displayCurrentSalary = playerData.displayCurrentSalary;
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
        leagueName,
        team,
        teamName,
        careerEarnings,
        displayCareerEarnings,
        displayCurrentSalary,
      });
      newPlayer.save()
      .then(() => {
        newTeam.players.push(newPlayer);
        callback();
      });
    })
    .then(() => {
      newTeam.save()
      .then(() => {
        newLeague.teams.push(newTeam);
      });
    });
  });
  return newLeague;
}

router.route('/').get((req, res) => {
  League.find()
    .then(leagues => res.json(leagues))
    .catch(err => res.status(400).json('error: ' + err));
});

router.route('/add/all').get(async (req, res) => {
  await League.collection.drop()
    .catch();
  await Team.collection.drop()
    .catch();
  await Player.collection.drop()
    .catch();
  async.forEach(Object.keys(links), async (leagueAbbreviation) => {
    await getLeague(leagueAbbreviation)
    .then(async (league) => {
    let newLeague = await addLeague(league, leagueAbbreviation);
    newLeague.save();
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
  .then(async (league) => {
    let newLeague = await addLeague(league, 'NBA');
    newLeague.save()
    .then(() => res.json('NBA League Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  })
});

router.route('/add/teams').get((req, res) => {
  League.find()
  .then(leagues => {
    leagues.forEach((league) => {
      Team.find({league: league._id})
      .then(teams => {
        league.teams = teams;
        league.save()
      })
    })
  })
  .then(() => res.json('Teams linked to Leagues'))
  .catch(err => res.status(400).json('error: ' + err))
});

router.route('/:leagueAbbreviation').get((req, res) => {
  League.findOne({abbreviation: req.params.leagueAbbreviation})
  .populate({
    path: 'teams',
    populate: {path: 'players'}
  })
  .exec()
  .then(league => res.json(league.teams))
  .catch(err => res.status(400).json('error: ' + err))
});

router.route('/:leagueAbbreviation/:teamAbbreviation').get((req, res) => {
  Team.findOne({leagueName: req.params.leagueAbbreviation, abbreviation: req.params.teamAbbreviation})
  .populate('players')
  .exec()
  .then(team => res.json(team))
  .catch(err => res.status(400).json('error: ' + err))
});

module.exports = router;