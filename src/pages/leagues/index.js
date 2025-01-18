import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { list, getStanding } from '@/pages/api/getListApi';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout';

const LeaguesPage = () => {
  const { t } = useTranslation();
  const [StandingData, setStandingData] = useState(null);
  const [tournamentsData, setTournamentsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const queryParams = useSearchParams();
  const id_params = queryParams.get('id') || "39";
  const currentYear = new Date().getFullYear(); // if Api Score is available
  const season_params = queryParams.get('season') || "2022";
  const tab = queryParams.get('tab') || 'standings';

  const fetchTournamentsurl = async () => {
    const { success, data: dataRes } = await list("tab", "hung");
    const standingResult = dataRes.find(item => String(item.leagueId) === id_params);

    if (success) {
      setTournamentsData(standingResult);
    }
    setLoading(false);
  };

  const fetchStanding = async () => {
    const { success, data: dataRes } = await getStanding(id_params, season_params);
    if (success) {
      setStandingData(dataRes)
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTournamentsurl()
    fetchStanding()
  }, [id_params, season_params, tab]);

  if (loading) {
    return (
      <section>
        <div className='container'>
          <div className="inner-section p-6 mb-6">Loading...</div>
        </div>
      </section>
    );
  }

  if (!StandingData || !tournamentsData) {
    return (
      <section>
        <div className='container'>
          <div className="inner-section p-6 mb-6">No data available</div>
        </div>
      </section>
    );
  }

  const selectedIndex = tab === 'standings' ? 0 : 1;

  const handleTabSelect = (index) => {
    const selectedTab = index === 0 ? 'standings' : 'matches';
    router.push(`?tab=${selectedTab}`);
  };

  return (
    <Layout className="home-page">
      <section>
        <div className='page__container container-inner'>
          <div className="inner-section p-6 text_mode">
            <div className="flex items-center">
              <img className="leagues__logo" src={tournamentsData.logo} alt="" />
              <div className="ml-4">
                <h1 className="text-base font-smb">{tournamentsData.name}</h1>
                <p>{tournamentsData.nameCountry}</p>
              </div>
            </div>
          </div>
          <div className="inner-section p-6 text_mode">
            <Tabs selectedIndex={selectedIndex} onSelect={handleTabSelect}>
              <TabList className="mb-6 core_tab__menu pointer-events-none">
                <Tab>{t('table')}</Tab>
                {/* <Tab>{t('matches')}</Tab> */}
              </TabList>

              <TabPanel>
                <table className="core_table core_table--auto text-left">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th colSpan="2"></th>
                      <th>PL</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>+/-</th>
                      <th>GD</th>
                      <th className="text-right">PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {StandingData.map((team) => (
                      <tr key={team.teamId}>
                        <td className="w-4">{team.rank}</td>
                        <td className="w-10 text-center">
                          <img src={team.logo} alt={team.name} style={{ width: 'auto', height: '20px', margin: 'auto' }} />
                        </td>
                        <td>{team.name}</td>
                        <td>{team.totalGames}</td>
                        <td>{team.totalWins}</td>
                        <td>{team.totalDraws}</td>
                        <td>{team.totalLosses}</td>
                        <td>{team.goalsFor}/{team.goalsAgainst}</td>
                        <td>{team.goalDifference}</td>
                        <td className="text-right">{team.totalPoints}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default LeaguesPage;
