const {links, teams} = require("./globals.js");
const got = require("got");

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const headers = {
  'Content-Type':'application/json',
}

// let nba_teams = ['ATL','BKN','BOS','CHA','CHI','CLE','DAL','DEN','DET',
//   'GSW','HOU','IND','LAC','LAL','MEM','MIA','MIL','MIN','NO','NYK',
//   'OKC','ORL','PHI','PHX','POR','SAC','SA','TOR','UTAH','WAS'];

async function listAthletesOfSchool(school){
  for(let team of teams.nba){
    var team_name = true;
    let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links.nba+'teams/'+team+'/roster', { headers: headers, responseType: 'json' })
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

async function listAthletesOfTeam(team){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links.nba+'teams/'+team+'/roster', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listAthletesOfTeam ${err}`));                  
  if( !response ) return;

  if(response.body.athletes){
    for(let athlete of response.body.athletes){
      console.log(athlete);
    }
  }
}

async function listTeamsOfLeague(league){
  var count = 0;
  for(let team of teams[league]){
    let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'/teams/'+team, { headers: headers, responseType: 'json' })
                        .catch(err => console.error(`listTeams ${err}`));
    if( !response ) return;
    
    if(response.body){
      count += 1;
      // console.log(response.body.team);
    }
  }
  console.log(count);
  console.log(teams[league].length);
}

async function listTeam(league, team){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/'+links[league]+'teams/'+team, { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeam ${err}`));
  if( !response ) return;

  if(response.body){
    console.log(response.body.team);
  }
}

async function listTeamsTest(){
  let response = await got('http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams', { headers: headers, responseType: 'json' })
                      .catch(err => console.error(`listTeams ${err}`));
  if( !response ) return;
  
  for(let nflTeam of response.body.sports[0].leagues[0].teams){
    console.log(nflTeam.team.abbreviation);
  }
}

async function main(){
  // listAthletesOfSchool('North Carolina');
  // listAthletesOfTeam('CHA');
  listTeamsOfLeague('mlb');
  // listTeam('nfl','ATL');
  // listTeamsTest();

};
  
(async () => {
  await main();
})();

// export {listAthletesOfSchool, listAthletesOfTeam, listTeams, listTeam};