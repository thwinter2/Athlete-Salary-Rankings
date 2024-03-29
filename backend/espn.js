const {links, teams} = require("./globals.js");
const got = require("got");

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const headers = {
  'Content-Type':'application/json',
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

async function listAthletesOfSchool(school){
  for(let team of teams.NBA){
    var team_name = true;
    let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links.NBA+'teams/'+team+'/roster', { headers: headers, responseType: 'json' })
                        .catch(err => console.error(`listAthletesOfSchool ${err}`));
    if( !response ) return;

    if(response.body.athletes){
      for(let athlete of response.body.athletes){
        if(athlete.college && athlete.college.name == school){
          if(team_name){
            console.log(team+':')
            team_name = false;
          }
          console.log(athlete.fullName);
        }
        //var salaryText = Number.parseFloat(athlete.contract.salary);
        //console.log('$'+salaryText);
      }
    }
  }
}

async function getAthletes(league, team){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'teams/'+team+'/roster', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`getAthletes ${err}`));
  if( !response ) return;

  if(response.body.athletes){
    let athletes;
    switch (league){
      case 'NBA':
        athletes = response.body.athletes;
        for(let athlete of athletes){
          let contracts = new Map;
          let earnings = 0;
          if (athlete.contracts.length > 0) {
            for (contract of athlete.contracts) {
              earnings += contract.salary;
              contracts.set(`${contract.season.year}`, {salaryNumber: contract.salary, salaryString: formatter.format(contract.salary)});
            }
            athlete.contracts = contracts;
          }
          else {
            contracts.set('2022', {salaryNumber: 0, salaryString: '$0'});
          }
            athlete.careerEarnings = earnings;
            athlete.displayCareerEarnings = formatter.format(earnings);
            // athlete.displayCurrentSalary = athlete.contracts.has('2022') ? athlete.contracts.get('2022').salaryString : athlete.contracts.get('2021').salaryString;
        }
        return athletes;
      case 'WNBA':
        return response.body.athletes;
      case 'NFL':
      case 'NHL':
      case 'MLB':
        athletes = [];
        for (let position of response.body.athletes) {
          athletes.push(...position.items);
        }
        return athletes;
    }
  }
}

async function listAthletesOfTeam(league, team){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'teams/'+team+'/roster', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listAthletesOfTeam ${err}`));                  
  if( !response ) return;

  if(response.body.athletes){
    console.log(response.body.athletes[0].links);
  }
}

async function listCollegesOfAthletesOfTeam(league, team){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'teams/'+team+'/roster', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listAthletesOfTeam ${err}`));                  
  if( !response ) return;

  if(response.body.athletes){
    let athletes = []
    if(league == 'NFL' || league == 'MLB' || league == 'NHL'){
      for(let position of response.body.athletes){
        athletes.push(...position.items);
      }
    }
    else{
      athletes.push(...response.body.athletes);
    }
    for(let athlete of athletes){
      console.log(athlete.college);
    }
  }
}

async function getTeamSize(league, team){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'teams/'+team+'/roster', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listAthletesOfTeam ${err}`));                  
  if( !response ) return;

  if(response.body.athletes){
    return response.body.athletes.length;
  }
}


async function getTeamsOfLeague(league){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'/teams?limit=1000', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeams ${err}`));
  if( !response ) return;
  
  if(response.body){
    return response.body.sports[0].leagues[0].teams
  }
}

async function listTeamsOfLeague(league){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'/teams?limit=1000', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeams ${err}`));
  if( !response ) return;
  
  if(response.body){
    // console.log(response.body.sports[0].leagues[0].teams);
    for(let teamData of response.body.sports[0].leagues[0].teams){
      console.log(teamData.team.abbreviation);
    }
  }
}

async function getTeam(league, team){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'teams/'+team, { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeam ${err}`));
  if( !response ) return;

  if(response.body){
    response.body.team.league = league;
    return response.body.team;
  }
}

async function getLeague(league){
  // console.log(leagueLink);
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'teams?limit=1000', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`getLeague ${err}`));
  if( !response ) return;

  if(response.body){
    // let teamsArray = [];
    let league = response.body.sports[0].leagues[0];
    // for(let singleTeam of league.teams){
    //   teamsArray.push(singleTeam.team);
    // }
    // league.teams = teamsArray;
    // league.teams = null;
    // console.log(league);
    return league;
  }
}

async function getColleges(){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?limit=1000', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeamsTest ${err}`));
  if( !response ) return;

  if(response.body){
    let colleges = response.body.sports[0].leagues[0].teams;
    let newColleges = [];
    for (let college of colleges) {
      newColleges.push(college.team);
    }
    return newColleges;
  }
}

async function listTeam(league, team){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'teams/'+team, { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeam ${err}`));
  if( !response ) return;

  if(response.body){
    console.log(response.body.team);
  }
}

async function listTeamStats(league, team){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'teams/'+team+'/statistics', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeam ${err}`));
  if( !response ) return;

  if(response.body){
    console.log(response.body.results.stats.categories);
  }
}

async function listTeamsTest(){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?limit=1000', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeamsTest ${err}`));
  if( !response ) return;

  if(response.body){
    let league = response.body.sports[0].leagues[0].teams[41];
    let teams = league.teams;
    // league.teams = [];
    console.log(league);
    // for(let team of response.body.sports[0].leagues[0].teams){
    //   console.log(team.team);
    // }
  }
}

async function main(){
  // listAthletesOfSchool('North Carolina');
  // listAthletesOfTeam('NBA','DAL');
  // listTeamsOfLeague('NBA');
  // listTeamStats('NBA','ATL');
  // listTeamsTest();
  // listCollegesOfAthletesOfTeam('NHL','CAR');

};
  
(async () => {
  await main();
})();

module.exports = {listAthletesOfSchool, listAthletesOfTeam, getTeamsOfLeague, getAthletes, getTeam, getTeamSize,
                getLeague, getColleges};