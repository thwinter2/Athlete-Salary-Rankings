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
  WNBA: ['ATL','CHI','CONN','DAL','IND','LV','LA','MIN','NY','PHX',
  'SEA','WSH'],
  NFL: ['ARI','ATL','BAL','BUF','CAR','CHI','CIN','CLE','DAL','DEN',
  'DET','GB','HOU','IND','JAX','KC','LV','LAC','LAR','MIA','MIN',
  'NE','NO','NYG','NYJ','PHI','PIT','SEA','SF','TB','TEN','WSH'],
  MLB: ['ARI','ATL','BAL','BOS','CHC','CHW','CIN','CLE','COL','DET',
  'HOU','KC','LAA','LAD','MIA','MIL','MIN','NYM','NYY','OAK','PHI',
  'PIT','SD','SEA','SF','STL','TB','TEX','TOR','WSH'],
  NHL: ['ANA','ARI','BOS','BUF','CGY','CAR','CBJ','CHI','COL','DAL',
  'DET','EDM','FLA','LA','MIN','MTL','NJ','NSH','NYI','NYR','OTT',
  'PHI','PIT','SEA','SJ','STL','TB','TOR','VAN','VGS','WPJ','WSH']
}

module.exports = {links, teams};