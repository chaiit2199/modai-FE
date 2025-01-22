
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSearchParams, useRouter } from 'next/navigation';

import Layout from '@/components/layout';
import { Table, Modal } from '@/components/core_component';

import { listMatch } from '@/pages/api/getListApi';
import { DateFormat } from '@/utils';

const EvaluateComponent = () => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const tab = "upcoming";
  const date = new Date();

  const fetchData = async () => {
    const { success, data: dataRes } = await listMatch(tab, DateFormat(date));
    if (success && Array.isArray(dataRes)) {
      setMatches(dataRes);
    } else {
      console.error("Expected an array but received:", dataRes);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    if (searchParams.get("id")) {
      setShowModal(true);
    }
  }, [searchParams.get("id")]);

  const handleEdit = (rowIndex) => {
    const match = matches[rowIndex];
    console.log("Navigating to: /auth/evaluate?id=" + match.fixtureId);
    router.push(`/auth/evaluate?id=${match.fixtureId}`, undefined, { shallow: true });
  };

  // content table
  const thead = ['Home Team', 'Away Team', 'Start Time', 'League', 'Status'];
  const tableData = matches.map(match => [
    // match.fixtureId,
    match.nameHome,
    match.nameAway,
    DateFormat(match.timeStart),
    match.leagueName,
    match.status
  ]);

  const tableHistory = matches.map(match => [
    <div>{match.nameHome} - match.nameAway</div>,
    match.nameAway
  ]);

  const fakeFata = [
    {
      "fixtureId": 1224027,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T13:30:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 78,
      "leagueName": "Bundesliga",
      "leagueLogo": "https://media.api-sports.io/football/leagues/78.png",
      "leagueCountry": "Germany",
      "idHome": 1224027,
      "nameHome": "VfL Bochum",
      "logoHome": "https://media.api-sports.io/football/teams/176.png",
      "idAway": 161,
      "nameAway": "VfL Wolfsburg",
      "logoAway": "https://media.api-sports.io/football/teams/161.png",
      "scoreHome": "1",
      "scoreAway": "3",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1208089,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T14:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 39,
      "leagueName": "Premier League",
      "leagueLogo": "https://media.api-sports.io/football/leagues/39.png",
      "leagueCountry": "England",
      "idHome": 1208089,
      "nameHome": "Manchester City",
      "logoHome": "https://media.api-sports.io/football/teams/50.png",
      "idAway": 36,
      "nameAway": "Fulham",
      "logoAway": "https://media.api-sports.io/football/teams/36.png",
      "scoreHome": "3",
      "scoreAway": "2",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1223655,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T16:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 135,
      "leagueName": "Serie A",
      "leagueLogo": "https://media.api-sports.io/football/leagues/135.png",
      "leagueCountry": "Italy",
      "idHome": 1223655,
      "nameHome": "Atalanta",
      "logoHome": "https://media.api-sports.io/football/teams/499.png",
      "idAway": 495,
      "nameAway": "Genoa",
      "logoAway": "https://media.api-sports.io/football/teams/495.png",
      "scoreHome": "5",
      "scoreAway": "1",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1208087,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T16:30:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 39,
      "leagueName": "Premier League",
      "leagueLogo": "https://media.api-sports.io/football/leagues/39.png",
      "leagueCountry": "England",
      "idHome": 1208087,
      "nameHome": "Everton",
      "logoHome": "https://media.api-sports.io/football/teams/45.png",
      "idAway": 34,
      "nameAway": "Newcastle",
      "logoAway": "https://media.api-sports.io/football/teams/34.png",
      "scoreHome": "0",
      "scoreAway": "0",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1208574,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T16:30:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 140,
      "leagueName": "La Liga",
      "leagueLogo": "https://media.api-sports.io/football/leagues/140.png",
      "leagueCountry": "Spain",
      "idHome": 1208574,
      "nameHome": "Valladolid",
      "logoHome": "https://media.api-sports.io/football/teams/720.png",
      "idAway": 728,
      "nameAway": "Rayo Vallecano",
      "logoAway": "https://media.api-sports.io/football/teams/728.png",
      "scoreHome": "1",
      "scoreAway": "2",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1224028,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T16:30:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 78,
      "leagueName": "Bundesliga",
      "leagueLogo": "https://media.api-sports.io/football/leagues/78.png",
      "leagueCountry": "Germany",
      "idHome": 1224028,
      "nameHome": "FC St. Pauli",
      "logoHome": "https://media.api-sports.io/football/teams/186.png",
      "idAway": 164,
      "nameAway": "FSV Mainz 05",
      "logoAway": "https://media.api-sports.io/football/teams/164.png",
      "scoreHome": "0",
      "scoreAway": "3",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1213803,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T17:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 61,
      "leagueName": "Ligue 1",
      "leagueLogo": "https://media.api-sports.io/football/leagues/61.png",
      "leagueCountry": "France",
      "idHome": 1213803,
      "nameHome": "Lille",
      "logoHome": "https://media.api-sports.io/football/teams/79.png",
      "idAway": 96,
      "nameAway": "Toulouse",
      "logoAway": "https://media.api-sports.io/football/teams/96.png",
      "scoreHome": "2",
      "scoreAway": "1",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1223659,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T18:45:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 135,
      "leagueName": "Serie A",
      "leagueLogo": "https://media.api-sports.io/football/leagues/135.png",
      "leagueCountry": "Italy",
      "idHome": 1223659,
      "nameHome": "Inter",
      "logoHome": "https://media.api-sports.io/football/teams/505.png",
      "idAway": 503,
      "nameAway": "Torino",
      "logoAway": "https://media.api-sports.io/football/teams/503.png",
      "scoreHome": "3",
      "scoreAway": "2",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1213807,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T19:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 61,
      "leagueName": "Ligue 1",
      "leagueLogo": "https://media.api-sports.io/football/leagues/61.png",
      "leagueCountry": "France",
      "idHome": 1213807,
      "nameHome": "Rennes",
      "logoHome": "https://media.api-sports.io/football/teams/94.png",
      "idAway": 91,
      "nameAway": "Monaco",
      "logoAway": "https://media.api-sports.io/football/teams/91.png",
      "scoreHome": "1",
      "scoreAway": "2",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1208088,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T14:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 39,
      "leagueName": "Premier League",
      "leagueLogo": "https://media.api-sports.io/football/leagues/39.png",
      "leagueCountry": "England",
      "idHome": 1208088,
      "nameHome": "Leicester",
      "logoHome": "https://media.api-sports.io/football/teams/46.png",
      "idAway": 35,
      "nameAway": "Bournemouth",
      "logoAway": "https://media.api-sports.io/football/teams/35.png",
      "scoreHome": "1",
      "scoreAway": "0",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1208090,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T14:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 39,
      "leagueName": "Premier League",
      "leagueLogo": "https://media.api-sports.io/football/leagues/39.png",
      "leagueCountry": "England",
      "idHome": 1208090,
      "nameHome": "West Ham",
      "logoHome": "https://media.api-sports.io/football/teams/48.png",
      "idAway": 57,
      "nameAway": "Ipswich",
      "logoAway": "https://media.api-sports.io/football/teams/57.png",
      "scoreHome": "4",
      "scoreAway": "6",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1208083,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T14:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 39,
      "leagueName": "Premier League",
      "leagueLogo": "https://media.api-sports.io/football/leagues/39.png",
      "leagueCountry": "England",
      "idHome": 1208083,
      "nameHome": "Brentford",
      "logoHome": "https://media.api-sports.io/football/teams/55.png",
      "idAway": 39,
      "nameAway": "Wolves",
      "logoAway": "https://media.api-sports.io/football/teams/39.png",
      "scoreHome": "0",
      "scoreAway": "5",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1208081,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T14:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 39,
      "leagueName": "Premier League",
      "leagueLogo": "https://media.api-sports.io/football/leagues/39.png",
      "leagueCountry": "England",
      "idHome": 1208081,
      "nameHome": "Arsenal",
      "logoHome": "https://media.api-sports.io/football/teams/42.png",
      "idAway": 41,
      "nameAway": "Southampton",
      "logoAway": "https://media.api-sports.io/football/teams/41.png",
      "scoreHome": "3",
      "scoreAway": "3",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1213804,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T15:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 61,
      "leagueName": "Ligue 1",
      "leagueLogo": "https://media.api-sports.io/football/leagues/61.png",
      "leagueCountry": "France",
      "idHome": 1213804,
      "nameHome": "Saint Etienne",
      "logoHome": "https://media.api-sports.io/football/teams/1063.png",
      "idAway": 108,
      "nameAway": "Auxerre",
      "logoAway": "https://media.api-sports.io/football/teams/108.png",
      "scoreHome": "12",
      "scoreAway": "12",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1208573,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T16:30:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 140,
      "leagueName": "La Liga",
      "leagueLogo": "https://media.api-sports.io/football/leagues/140.png",
      "leagueCountry": "Spain",
      "idHome": 1208573,
      "nameHome": "Las Palmas",
      "logoHome": "https://media.api-sports.io/football/teams/534.png",
      "idAway": 538,
      "nameAway": "Celta Vigo",
      "logoAway": "https://media.api-sports.io/football/teams/538.png",
      "scoreHome": "11",
      "scoreAway": "1",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1208566,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T14:15:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 140,
      "leagueName": "La Liga",
      "leagueLogo": "https://media.api-sports.io/football/leagues/140.png",
      "leagueCountry": "Spain",
      "idHome": 1208566,
      "nameHome": "Getafe",
      "logoHome": "https://media.api-sports.io/football/teams/546.png",
      "idAway": 727,
      "nameAway": "Osasuna",
      "logoAway": "https://media.api-sports.io/football/teams/727.png",
      "scoreHome": "1",
      "scoreAway": "15",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1208086,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T11:30:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 39,
      "leagueName": "Premier League",
      "leagueLogo": "https://media.api-sports.io/football/leagues/39.png",
      "leagueCountry": "England",
      "idHome": 1208086,
      "nameHome": "Crystal Palace",
      "logoHome": "https://media.api-sports.io/football/teams/52.png",
      "idAway": 40,
      "nameAway": "Liverpool",
      "logoAway": "https://media.api-sports.io/football/teams/40.png",
      "scoreHome": "2",
      "scoreAway": "1",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1223664,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T13:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 135,
      "leagueName": "Serie A",
      "leagueLogo": "https://media.api-sports.io/football/leagues/135.png",
      "leagueCountry": "Italy",
      "idHome": 1223664,
      "nameHome": "Udinese",
      "logoHome": "https://media.api-sports.io/football/teams/494.png",
      "idAway": 867,
      "nameAway": "Lecce",
      "logoAway": "https://media.api-sports.io/football/teams/867.png",
      "scoreHome": "1",
      "scoreAway": "1",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1224024,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T13:30:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 78,
      "leagueName": "Bundesliga",
      "leagueLogo": "https://media.api-sports.io/football/leagues/78.png",
      "leagueCountry": "Germany",
      "idHome": 1224024,
      "nameHome": "Werder Bremen",
      "logoHome": "https://media.api-sports.io/football/teams/162.png",
      "idAway": 160,
      "nameAway": "SC Freiburg",
      "logoAway": "https://media.api-sports.io/football/teams/160.png",
      "scoreHome": "0",
      "scoreAway": "2",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1224020,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T13:30:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 78,
      "leagueName": "Bundesliga",
      "leagueLogo": "https://media.api-sports.io/football/leagues/78.png",
      "leagueCountry": "Germany",
      "idHome": 1224020,
      "nameHome": "Bayer Leverkusen",
      "logoHome": "https://media.api-sports.io/football/teams/168.png",
      "idAway": 191,
      "nameAway": "Holstein Kiel",
      "logoAway": "https://media.api-sports.io/football/teams/191.png",
      "scoreHome": "2",
      "scoreAway": "3",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1224026,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T13:30:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 78,
      "leagueName": "Bundesliga",
      "leagueLogo": "https://media.api-sports.io/football/leagues/78.png",
      "leagueCountry": "Germany",
      "idHome": 1224026,
      "nameHome": "Union Berlin",
      "logoHome": "https://media.api-sports.io/football/teams/182.png",
      "idAway": 165,
      "nameAway": "Borussia Dortmund",
      "logoAway": "https://media.api-sports.io/football/teams/165.png",
      "scoreHome": "2",
      "scoreAway": "3",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1208567,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T19:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 140,
      "leagueName": "La Liga",
      "leagueLogo": "https://media.api-sports.io/football/leagues/140.png",
      "leagueCountry": "Spain",
      "idHome": 1208567,
      "nameHome": "Real Madrid",
      "logoHome": "https://media.api-sports.io/football/teams/541.png",
      "idAway": 533,
      "nameAway": "Villarreal",
      "logoAway": "https://media.api-sports.io/football/teams/533.png",
      "scoreHome": "2",
      "scoreAway": "3",
      "oddHome": "",
      "oddAway": ""
    },
    {
      "fixtureId": 1212918,
      "timezone": "UTC",
      "status": "FT",
      "timeStart": "2024-10-05T12:00:00.000+00:00",
      "date": "2024-10-05",
      "leagueId": 140,
      "leagueName": "La Liga",
      "leagueLogo": "https://media.api-sports.io/football/leagues/140.png",
      "leagueCountry": "Spain",
      "idHome": 1212918,
      "nameHome": "Espanyol",
      "logoHome": "https://media.api-sports.io/football/teams/540.png",
      "idAway": 798,
      "nameAway": "Mallorca",
      "logoAway": "https://media.api-sports.io/football/teams/798.png",
      "scoreHome": "2",
      "scoreAway": "1",
      "oddHome": "",
      "oddAway": ""
    }
  ]


  return (
    <Layout className="home-page">
      <div className='container-inner my-10'>
        <Table style="text-left" headers={thead} data={tableData} onClick={handleEdit} />
      </div>
      <Modal title="Cập nhật ..." show={showModal} onClose={() => setShowModal(false)}>
        <Table style="text-left" headers={['Home Team', 'Away Team']}>
          <td>
            <div className=' my-4'>
              {
                fakeFata?.map((item) => {
                  return <div className='inner-section matches_item'><img src={item.logoHome} /> <p className='score'>{item.scoreHome} - {item.scoreAway}</p>  <img src={item.logoAway} /></div>;
                })
              }
            </div>
          </td>
          <td>
            <div className=' mt-4'>
              {
                fakeFata?.map((item) => {
                  return <div className='inner-section matches_item'><img src={item.logoHome} /> <p className='score'>{item.scoreHome} - {item.scoreAway}</p>  <img src={item.logoAway} /></div>;
                })
              }
            </div>
          </td>
        </Table>
      </Modal>
    </Layout >
  );
};


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default EvaluateComponent;
