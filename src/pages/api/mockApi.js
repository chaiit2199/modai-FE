
const TopTournamentsData = 'fake_data/topTournaments.json';
// export async function getMatchData() {
//   const response = await fetch('/assets/fake_data/match.json');
//   if (!response.ok) throw new Error('Failed to fetch match data');
//   return await response.json();
// }

// export async function getStandingsData() {
//   const response = await fetch('/assets/fake_data/standings.json');
//   if (!response.ok) throw new Error('Failed to fetch standings data');
//   return await response.json();
// }

export async function getTopTournamentsData() {
  const response = await fetch(TopTournamentsData);
  if (!response.ok) throw new Error('Failed to fetch top tournaments data');
  return await response.json();
}

// export async function getWorldHistoryData() {
//   const response = await fetch('/assets/fake_data/world_history.json');
//   if (!response.ok) throw new Error('Failed to fetch world history data');
//   return await response.json();
// }
