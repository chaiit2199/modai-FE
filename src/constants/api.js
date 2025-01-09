export const API = {
  TOPTOURNAMENTS: {
    LIST: '/leagues/top5'
  },
  MATCH: {
    URL: '/fixtures/:tab'
  },
  LEAGUES: {
    getSTANDING: (id, season) => `http://localhost:8081/api/v1/standings/${id}?season=${season}`
  }
};
