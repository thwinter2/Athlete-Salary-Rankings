var links = {
  NBA: 'basketball/nba/',
  WNBA: 'basketball/wnba/',
  // NCAAM: 'basketball/mens-college-basketball/',
  // NCAAW: 'basketball/womens-college-basketball/',
  NFL: 'football/nfl/',
  // NCAAF: 'football/college-football/',
  MLB: 'baseball/mlb/',
  // CBASE: 'baseball/college-baseball/',
  NHL: 'hockey/nhl/',
}

var teams = {
  NBA: ['ATL','BKN','BOS','CHA','CHI','CLE','DAL','DEN','DET',
  'GSW','HOU','IND','LAC','LAL','MEM','MIA','MIL','MIN','NO','NYK',
  'OKC','ORL','PHI','PHX','POR','SAC','SA','TOR','UTAH','WAS'],
  NFL: ['ARI','ATL','BAL','BUF','CAR','CHI','CIN','CLE','DAL','DEN',
  'DET','GB','HOU','IND','JAX','KC','LV','LAC','LAR','MIA','MIN',
  'NE','NO','NYG','NYJ','PHI','PIT','SEA','SF','TB','TEN','WASHINGTON'],
  MLB: ['ARI','ATL','BAL','BOS','CHC','CHW','CIN','CLE','COL','DET',
  'HOU','KC','LAA','LAD','MIA','MIL','MIN','NYM','NYY','OAK','PHI',
  'PIT','SD','SEA','SF','STL','TB','TEX','TOR','WSH']
}

function getTeamRosterAbbreviation(abbreviation){
  let rosterLinkAbbreviation = '';
  switch (abbreviation){
    case ('GS'):
      rosterLinkAbbreviation = 'GSW';
      break;
    case ('NY'):
      rosterLinkAbbreviation = 'NYK';
      break;
    case ('WSH'):
      rosterLinkAbbreviation = 'WAS';
      break;
    default:
      rosterLinkAbbreviation = abbreviation;
      break;
  }
  return rosterLinkAbbreviation;
}

module.exports = {links, teams, getTeamRosterAbbreviation};