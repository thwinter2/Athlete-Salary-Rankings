const {links, teams} = require("./globals.js");
const got = require("got");

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const headers = {
  'Content-Type':'application/json',
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
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
                      .catch(err => console.error(`listAthletesOfSchool ${err}`));
  if( !response ) return;

  if(response.body.athletes){
    for(let athlete of response.body.athletes){
      var earnings = athlete.contracts.reduce((previousValue, currentValue) => {
        return {
          salary: previousValue.salary + currentValue.salary
        }
      });
      athlete.league = league;
      athlete.team = team;
      athlete.earnings = earnings;
    }
    return response.body.athletes;
  }
}

async function listAthletesOfTeam(team){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links.NBA+'teams/'+team+'/roster', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listAthletesOfTeam ${err}`));                  
  if( !response ) return;

  if(response.body.athletes){
    // for(let athlete of response.body.athletes){
    //   response.body.athletes[0].league = 'NBA';
    //   response.body.athletes[0].team = team;
    //   console.log(athlete);
    // }
    response.body.athletes[3].league = 'NBA';
    response.body.athletes[3].team = team;
    console.log(response.body.athletes[3]);
    var earnings = 0;
    for(contract of response.body.athletes[3].contracts){
      earnings += contract.salary;
    }
    response.body.athletes[3].earnings = formatter.format(earnings);
    console.log(response.body.athletes[3].earnings);
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
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'teams?limit=1000', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeam ${err}`));
  if( !response ) return;

  if(response.body){
    return response.body.sports[0].leagues[0];
  }
}

async function listTeam(league, team){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'teams/'+team, { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeam ${err}`));
  if( !response ) return;

  if(response.body){
    response.body.team.league = league;
    console.log(response.body.team);
  }
}

async function listTeamsTest(){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?limit=1000', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeams ${err}`));
  if( !response ) return;

  if(response.body){
    let league = response.body.sports[0].leagues[0];
    league.teams = [];
    console.log(league);
    // for(let team of response.body.sports[0].leagues[0].teams){
    //   console.log(team.team);
    // }
  }
}

async function main(){
  // listAthletesOfSchool('North Carolina');
  // listAthletesOfTeam('DAL');
  // listTeamsOfLeague('NBA');
  // listTeam('NFL','ATL');
  listTeamsTest();

};
  
(async () => {
  await main();
})();

module.exports = {listAthletesOfSchool, listAthletesOfTeam, getTeamsOfLeague, getAthletes, getTeam, getTeamSize,
                getLeague};