const got = require("got");

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const headers = {
        'Content-Type':'application/json',
    }

let nba_teams = ['ATL','BKN','BOS','CHA','CHI','CLE','DAL','DEN','DET',
    'GSW','HOU','IND','LAC','LAL','MEM','MIA','MIL','MIN','NO','NYK',
    'OKC','ORL','PHI','PHX','POR','SAC','SA','TOR','UTAH','WAS'];

class NBA{
	async listAthletesOfSchool(school){
        for(let team of nba_teams){
            var team_name = true;
            let response = await got('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/'+team+'/roster', { headers: headers, responseType: 'json' })
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
};

async function main(){
    let client = new NBA();

    client.listAthletesOfSchool('North Carolina');

};
  
(async () => {
    await main();
})();