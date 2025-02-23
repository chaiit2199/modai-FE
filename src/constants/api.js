export const API = {
  TOPTOURNAMENTS: {
    LIST: '/leagues/top5'
  },
  MATCH: {
    URL: '/fixtures'
  },
  MATCHES: {
    H2H: '/fixtures/h2h/:id',
    ODDS: '/odds/:id',
    Statistics: '/statistics/:id',
    Coaches: '/coaches/:id',
    Injuries: '/injuries/:id',
    AiAnalysis: '/ai/:id'
  },
  LEAGUES: {
    getSTANDING: (id, season) => `/standings/${id}?season=${season}`
  }
};
