
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSearchParams, useRouter } from 'next/navigation';
import StatisticsChart from '@/components/StatisticsChart';

import Layout from '@/components/layout';
import { GetH2H, GetODDS, GetStatistics, GetCoaches, GetInjuries, GetAiAnalysis, listMatch } from '@/pages/api/getListApi';
import { TimeFormat, DateFormat, VNDateFormat } from '@/utils';
import { Injuries, translatePlayers, Loading } from '@/components/RenderCompnent';

const Performance = ({ form }) => {
  const getColor = (result) => {
    if (result === "W") return "bg-green-500"; 
    if (result === "L") return "bg-red-500";   
    if (result === "D") return "bg-orange-500";
    return "bg-gray-500"; // default
  };

  const recentMatches = form?.split("").slice(0, 5); 

  return (
    <div className="flex flex-wrap justify-center">
      {recentMatches?.map((result, index) => (
        <span key={index} className={`${getColor(result)} py-1 px-2 block mx-1 rounded text-xs text_mode`}>
          {result}
        </span>
      ))}
    </div>
  );
};

const mergeGoalsData = (homeGoals, awayGoals) => {
  return Object.keys({ ...homeGoals, ...awayGoals })
    .sort((a, b) => {
      const [startA] = a.split('-').map(Number);
      const [startB] = b.split('-').map(Number);
      return startA - startB;
    })
    .map((timeRange) => ({
      timeRange: `${timeRange} phút`,
      home: homeGoals[timeRange] || 0,
      away: awayGoals[timeRange] || 0,
    }));
};

const MatchesComponent = () => {
  const searchParams = useSearchParams();
  const fixtureId = searchParams.get("id")
  const params_date = searchParams.get("date")

  const [dataMatch, setMatch] = useState([]);
  const [dataH2H, setH2H] = useState([]);
  const [dataODDS, setODDS] = useState([]);
  const [dataStatistics, setStatistics] = useState([]);
  const [dataCoachesAway, setCoachesAway] = useState([]);
  const [dataCoachesHome, setCoachesHome] = useState([]);
  const [dataAiAnalysis, setAiAnalysis] = useState({});

  const [dataInjuriesAway, setInjuriesAway] = useState([]);
  const [dataInjuriesHome, setInjuriesHome] = useState([]);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0)
 
  
  useEffect(() => {
    const fetchData = async () => {
      if (!fixtureId) return;

      setLoading(true);
      try {  

        // Fetch Fixtures
        const { success: successtMatch, data: MatchRes } = await listMatch(DateFormat(params_date));
        if (successtMatch && MatchRes) {
          const MatchResId = MatchRes.find(item => item.fixtureId.toString() === fixtureId.toString());
          setMatch(MatchResId);
        }

        // Fetch H2H
        const { success: h2hSuccess, data: h2hData } = await GetH2H(fixtureId);
        if (h2hSuccess && h2hData) {
          setH2H(h2hData);
        }

        // Fetch ODDS
        const { success: oddsSuccess, data: oddsData } = await GetODDS(fixtureId);
        if (oddsSuccess && oddsData) {
          setODDS(oddsData[0]?.bets || []);
        }

        // Fetch Statistics
        const { success: statisticsSuccess, data: statisticsData } = await GetStatistics(fixtureId);
        if (statisticsSuccess && statisticsData) { 
          setStatistics(statisticsData);
        }
        
        // Fetch Coaches
        const { success: coachesAwaySuccess, data: coachesAwayData } = await GetCoaches(statisticsData?.idAway);
        if (coachesAwaySuccess && coachesAwayData) {
          setCoachesAway(coachesAwayData);
        }

        const { success: coachesHomeSuccess, data: coachesHomeData } = await GetCoaches(statisticsData?.idHome);
        if (coachesHomeSuccess && coachesHomeData) {
          setCoachesHome(coachesHomeData);
        }

        // Fetch Injuries
        const { success: InjuriesAwaySuccess, data: InjuriesAwayData } = await GetInjuries(fixtureId);
        if (InjuriesAwaySuccess && InjuriesAwayData) {
         const InjuriesAway = InjuriesAwayData.filter(item => item.teamId == statisticsData.idAway)
          setInjuriesAway(InjuriesAway);
        }

        const { success: InjuriesHomeSuccess, data: InjuriesHomeData } = await GetInjuries(fixtureId);
        if (InjuriesHomeSuccess && InjuriesHomeData) {
         const InjuriesHome = InjuriesHomeData.filter(item => item.teamId == statisticsData.idHome)
          setInjuriesHome(InjuriesHome);
        } 

        // const { success: AiAnalysisSuccess, data: AiAnalysisData } = await GetAiAnalysis(fixtureId);
        // if (AiAnalysisSuccess && AiAnalysisData) {
        //   setAiAnalysis(AiAnalysisData);
        // }  

        setLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [fixtureId]);

    // Fetch AiAnalysis when other data is available
    useEffect(() => {
      if (fixtureId) {
        const fetchAiAnalysis = async () => {
          try {
            const { success: AiAnalysisSuccess, data: AiAnalysisData } = await GetAiAnalysis(fixtureId);
            if (AiAnalysisSuccess && AiAnalysisData) {
              setAiAnalysis(AiAnalysisData);
            }
          } catch (error) {
            console.error("Error fetching AI analysis:", error);
          }
        };
  
        fetchAiAnalysis();
      }
    }, [fixtureId]);

  if (loading) {
    return (
      <Loading /> 
    );
  }

  return (
    <Layout className="home-page">
      <div className='home-page__container matches_wrap container'>
        <div className='matches__body'>
          <table className="core_table core_table--fixed text-center mb-4 inner-section ">
            <thead>
              <tr className='bg_hover'>
                <th> 
                  <p className='text_mode flex items-center'>
                    <Image className="f-match__logo mr-2" width={32} height={32} src={dataMatch?.leagueLogo} alt={dataMatch?.leagueName} /> 
                    {dataMatch?.leagueName}
                  </p> 
                </th>
                </tr> 
            </thead>
            <tbody> 
                <tr className='border-b border-gray-300 not_target'>
                  <td>
                    <div className='text_mode flex items-center justify-center font-rg text-xl'>
                      <div className='flex items-center w-2/5 justify-end'>
                        {dataMatch?.nameHome}
                        <Image className="f-match__logo !mx-1" width={32} height={32} src={dataMatch?.logoHome} alt={dataMatch?.nameHome} /> 
                      </div> 

                      <p className='text-base text-[#A3A3A3] mx-2 w-1/5 justify-center'>{TimeFormat(dataMatch?.timeStart)}</p>

                      <div className='flex items-center w-2/5 justify-start'>
                        <Image className="f-match__logo !mx-1" width={32} height={32} src={dataMatch?.logoAway} alt={dataMatch?.nameAway} /> 
                        {dataMatch?.nameAway}
                      </div> 
                    </div> 
                  </td> 
                </tr> 
                <tr className='border-b border-gray-300 not_target'>
                  <td className="text-left">
                    <h1 className='text_mode mb-4'>{dataAiAnalysis.ai?.title}</h1>
                    <p className='text_mode'>{dataAiAnalysis.ai?.general}</p>
                  </td> 
                </tr> 
                <tr className='border-b border-gray-300'>
                  <td>
                    <div className='text_mode flex items-center justify-between font-rg'>
                      <p className='flex items-center text-[#A3A3A3]'>
                        <Image className="mr-1" src="/images/icons/calendar.svg" alt="Calendar" width={16} height={16} /> 
                        {VNDateFormat(dataMatch?.timeStart)}</p>
                      <p className='flex items-center text-[#A3A3A3]'>
                        <Image className="mr-1" src="/images/icons/location.svg" width={16} height={16} alt="Location" /> 
                        {dataMatch?.venueName}</p>
                    </div> 
                  </td> 
                </tr>  
            </tbody>
          </table>  

          <table className="core_table core_table--fixed mb-4 inner-section">
            <thead>
              <tr className='bg_hover'>
                <th colSpan={2}> 
                  {console.log(dataAiAnalysis)}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center w-1/3 justify-start'>
                      {dataMatch?.nameHome}
                      <Image className="f-match__logo !mx-1" width={32} height={32} src={dataMatch?.logoHome} alt={dataMatch?.nameHome} /> 
                      <p className='ml-2 text-[#A3A3A3]'>{dataAiAnalysis.ai?.squads.home.formation}</p>
                    </div> 
                    <p className='text_mode flex items-center justify-center w-1/3'>
                      Đội hình dự đoán
                    </p> 
                    <div className='flex items-center justify-end w-1/3'>
                      <p className='mr-2 text-[#A3A3A3]'>{dataAiAnalysis.ai?.squads.away.formation}</p>
                      <Image className="f-match__logo !mx-1 items-center" width={32} height={32} src={dataMatch?.logoAway} alt={dataMatch?.nameAway} /> 
                      {dataMatch?.nameAway}
                    </div> 
                  </div> 
                </th>
              </tr> 
            </thead>
            <tbody> 
                <tr className='not_target'> 
                  <td className="border-right"> 
                    {translatePlayers(dataAiAnalysis.ai?.squads.home.players)}
                  </td> 
                  <td>
                    {translatePlayers(dataAiAnalysis.ai?.squads.away.players)}
                  </td> 
                </tr>  

                <tr className="border-b border-gray-300 !border-none bg_hover text-center">
                  <td colSpan={2}>Huấn luyện viên</td>
                </tr>

                <tr className='not_target'> 
                  {console.log(dataCoachesHome)}
                  <td className="border-right"> 
                    <div className='flex items-center justify-center font-md text_mode'>
                      <Image className="player_logo mr-2" width={32} height={32} src={dataCoachesHome?.photo} alt={dataCoachesHome?.name} /> 
                      <p className='flex flex-col items-start'>
                        <span>{dataCoachesHome?.name}</span>
                        <span className='text-[#A3A3A3] text-xs'>{dataCoachesHome?.nationality}</span>
                      </p>
                    </div>
                  </td> 
                  <td>
                    <div className='flex items-center justify-center font-md text_mode'>
                      <p className='flex flex-col items-end'>
                        <span>{dataCoachesAway?.name}</span>
                        <span className='text-[#A3A3A3] text-xs'>{dataCoachesAway?.nationality}</span>
                      </p>
                      <Image className="player_logo ml-2" width={32} height={32} src={dataCoachesAway?.photo} alt={dataCoachesAway?.name} /> 
                    </div>
                  </td> 
                </tr>  

                {(dataInjuriesHome.length > 0 || dataInjuriesAway.length > 0) && (
                  <tr className="border-b border-gray-300 !border-none bg_hover text-center">
                    <td colSpan={2}>Cầu thủ bị chấn thương hoặc bị treo giò</td>
                  </tr>
                )}
                <tr className='not_target'>
                  {Injuries(dataInjuriesHome)}
                  {Injuries(dataInjuriesAway)}
                </tr>
            </tbody>
          </table>    

          <table className="core_table text-center core_table--fixed mt-4 mb-4 inner-section">
            <thead>
              <tr className='bg_hover'>
                <th className='!align-middle text-left'>Thống Kê</th>
                <th>
                  <div className='flex items-center justify-center text_mode'>
                    <Image className="f-match__logo mr-2" width={32} height={32} src={dataMatch?.logoHome} alt={dataMatch?.nameHome} /> 
                    {dataMatch?.nameHome}
                  </div>
                </th>
                <th>
                  <div className='flex items-center justify-center text_mode'>
                    <Image className="f-match__logo mr-2" width={32} height={32} src={dataMatch?.logoAway} alt={dataMatch?.nameAway} /> 
                    {dataMatch?.nameAway}
                  </div>  
                </th> 
              </tr>
            </thead>
            <tbody> 
                <tr className='border-b border-gray-300 '>
                  <td className="text-left">Các trận gần đây</td>
                  <td><Performance form={dataStatistics.homeForm} /></td>
                  <td><Performance form={dataStatistics.awayForm} /></td>
                </tr>
                <tr className='border-b border-gray-300 '>
                  <td className="text-left">Thắng</td>
                  <td>{dataStatistics?.homeTotalWins}</td>
                  <td>{dataStatistics?.awayTotalWins}</td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className="text-left">Hoà</td>
                  <td>{dataStatistics?.homeTotalDraws}</td>
                  <td>{dataStatistics?.awayTotalDraws}</td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className="text-left">Thua</td>
                  <td>{dataStatistics?.homeTotalLosses}</td>
                  <td>{dataStatistics?.awayTotalLosses}</td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className="text-left">Bàn thắng</td> 
                  <td>{dataStatistics?.homeTotalGoals}</td>
                  <td>{dataStatistics?.awayTotalGoals}</td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className="text-left">Bàn thua</td>
                  <td>{dataStatistics?.homeTotalGoalsAgainst}</td>
                  <td>{dataStatistics?.awayTotalGoalsAgainst}</td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className="text-left">Tỉ lệ so sánh bàn thắng</td>
                  <td>{dataStatistics?.homeGoalsComparisonPercent}</td>
                  <td>{dataStatistics?.awayGoalsComparisonPercent}</td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className="text-left">Tỉ lệ so sánh phòng thủ</td>
                  <td>{dataStatistics?.homeDefComparisonPercent}</td>
                  <td>{dataStatistics?.awayDefComparisonPercent}</td>
                </tr>

                <tr className='border-b border-gray-300'>
                  <td className="text-left">Tỷ lệ thắng</td>
                  <td>{dataStatistics?.homeH2HComparisonPercent}</td>
                  <td>{dataStatistics?.awayH2HComparisonPercent}</td>
                </tr> 

                <tr className='border-b border-gray-300'>
                  <td className="text-left">Tỷ lệ tấn công</td>
                  <td>{dataStatistics?.homeAttComparisonPercent}</td>
                  <td>{dataStatistics?.awayAttComparisonPercent}</td>
                </tr> 

                <tr className='border-b border-gray-300'>
                  <td className="text-left">Tỷ lệ phòng ngự</td>
                  <td>{dataStatistics?.homeDefComparisonPercent}</td>
                  <td>{dataStatistics?.awayDefComparisonPercent}</td>
                </tr> 
                <tr className='border-b border-gray-300'>
                  <td className="text-left">Phong độ thi đấu</td>
                  <td>{dataStatistics?.homeFormComparisonPercent}</td>
                  <td>{dataStatistics?.awayFormComparisonPercent}</td>
                </tr> 

                
                <tr className='border-b border-gray-300 !border-none bg_hover'>
                  <td className="text-center" colSpan={3}>Số bàn thắng mỗi 15 phút</td>
                </tr>
                
                {mergeGoalsData(dataStatistics.homeGoalsEach15Min, dataStatistics.awayGoalsEach15Min)
                  .map(({ timeRange, home, away }, index) => (
                    <tr key={index} className="border-b border-gray-300 align-top">
                      <td className="text-left">{timeRange}</td>
                      <td>{home} bàn</td>
                      <td>{away} bàn</td>
                    </tr>
                  ))}

                <tr className='border-b border-gray-300 !border-none bg_hover text-center'>
                  <td className="px-4 py-2 " colSpan={3}>Tỷ lệ số bàn thắng mỗi 15 phút</td>
                </tr>
                {mergeGoalsData(dataStatistics.homeGoalsPercentageEach15Min, dataStatistics.awayGoalsPercentageEach15Min)
                  .map(({ timeRange, home, away }, index) => (
                    <tr key={index} className="border-b border-gray-300 align-top">
                      <td className="text-left">{timeRange}</td>
                      <td>{home}</td>
                      <td>{away}</td>
                    </tr>
                  ))}

                <tr className='border-b border-gray-300 !border-none bg_hover'>
                  <td className="px-4 py-2 " colSpan={3}>Số bàn thua mỗi 15 phút</td>
                </tr>
                {mergeGoalsData(dataStatistics.homeGoalsAgainstEach15Min, dataStatistics.awayGoalsAgainstEach15Min)
                  .map(({ timeRange, home, away }, index) => (
                    <tr key={index} className="border-b border-gray-300 align-top">
                      <td className="text-left">{timeRange}</td>
                      <td>{home} bàn</td>
                      <td>{away} bàn</td>
                    </tr>
                  ))}

                <tr className='border-b border-gray-300 !border-none bg_hover'>
                  <td className="px-4 py-2 " colSpan={3}>Tỷ lệ số bàn thua mỗi 15 phút</td>
                </tr>
                {mergeGoalsData(dataStatistics.homeGoalsAgainstPercentageEach15Min, dataStatistics.awayGoalsAgainstPercentageEach15Min)
                  .map(({ timeRange, home, away }, index) => (
                    <tr key={index} className="border-b border-gray-300 align-top">
                      <td className="text-left">{timeRange}</td>
                      <td>{home}</td>
                      <td>{away}</td>
                    </tr>
                  ))}

                <tr className='border-b border-gray-300 !border-none bg_hover'>
                  <td className="px-4 py-2 " colSpan={3}>Số thẻ vàng mỗi 15 phút</td>
                </tr>
                {mergeGoalsData(dataStatistics.homeYellowCardsEach15Min, dataStatistics.awayYellowCardsEach15Min)
                  .map(({ timeRange, home, away }, index) => (
                    <tr key={index} className="border-b border-gray-300 align-top">
                      <td className="text-left">{timeRange}</td>
                      <td>{home} thẻ</td>
                      <td>{away} thẻ</td>
                    </tr>
                  ))}

                <tr className='border-b border-gray-300 !border-none bg_hover'>
                  <td className="px-4 py-2 " colSpan={3}>Tỷ lệ thẻ vàng mỗi 15 phút</td>
                </tr>
                {mergeGoalsData(dataStatistics.homeYellowCardsPercentageEach15Min, dataStatistics.awayYellowCardsPercentageEach15Min)
                  .map(({ timeRange, home, away }, index) => (
                    <tr key={index} className="border-b border-gray-300 align-top">
                      <td className="text-left">{timeRange}</td>
                      <td>{home}</td>
                      <td>{away}</td>
                    </tr>
                  ))}
                
            </tbody>
          </table> 
          <div className="inner-section p-4">
              <StatisticsChart
                statistics={dataStatistics}
                homeName={dataMatch?.nameHome}
                awayName={dataMatch?.nameAway}
              /> 
          </div>

          <ul className="core_tab__menu mb-4">
            {dataODDS.map((tab, index) => (
              <li
                key={tab.id}
                className={`${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.name}
              </li>
            ))}
          </ul> 
          <div className="inner-section px-4 pt-4 pb-2 mb-4">
            <div className="core_tab__content">
              <div className="odds__item">
                {dataODDS[activeTab]?.values.map((value, idx) => (
                    <span className='odd' key={idx}>{value.odd}</span>
                  ))}
                </div>
            </div>
          </div> 
          

          <table className="core_table core_table--auto text-center mt-4 mb-4 inner-section">
            <thead>
              <tr className='bg_hover'>
                <th className='text-left w-1/5 !align-middle'>Nhận định</th>
                <th className='w-2/5'>
                  <div className='flex items-center text_mode'>
                    <Image className="f-match__logo mr-2" width={32} height={32} src={dataMatch?.logoHome} alt={dataMatch?.nameHome} /> 
                    {dataMatch?.nameHome}
                  </div>
                </th>
                <th className='w-2/5'>
                  <div className='flex items-center text_mode '>
                    <Image className="f-match__logo mr-2" width={32} height={32} src={dataMatch?.logoAway} alt={dataMatch?.nameAway} /> 
                    {dataMatch?.nameAway}
                  </div>  
                </th> 
              </tr>
            </thead>
            <tbody> 
              <tr className='border-b border-gray-300'>
                  <td className="px-4 py-2  align-top text-left">Điểm mạnh</td>
                  <td className="px-4 py-2 text-left align-top">
                    {dataAiAnalysis.ai?.home.strengths.map((item, index) => {
                      return (
                        <p className='list--item' key={index}>{item}</p>
                      )
                    })}
                  </td>
                  <td className="px-4 py-2 text-left align-top">
                    {dataAiAnalysis.ai?.away.strengths.map((item, index) => {
                      return (
                        <p className='list--item' key={index}>{item}</p>
                      )
                    })}
                  </td>
                </tr>

                <tr className='border-b border-gray-300'>
                  <td className="px-4 py-2  align-top text-left">Điểm yếu</td>
                  <td className="px-4 py-2 text-left align-top">
                    {dataAiAnalysis.ai?.home.weaknesses.map((item, index) => {
                      return (
                        <p className='list--item' key={index}>{item}</p>
                      )
                    })}
                  </td>
                  <td className="px-4 py-2 text-left align-top">
                    {dataAiAnalysis.ai?.away.weaknesses.map((item, index) => {
                      return (
                        <p className='list--item' key={index}>{item}</p>
                      )
                    })}
                  </td>
                </tr>
                <tr className='border-b border-gray-300'>
                  <td className="px-4 py-2  align-top text-left">Phong độ</td>
                  <td className="px-4 py-2 text-left align-top">
                    {dataAiAnalysis.ai?.perspectives.home.map((item, index) => {
                      return (
                        <p className='list--item' key={index}>{item}</p>
                      )
                    })}
                  </td>
                  <td className="px-4 py-2 text-left align-top">
                    {dataAiAnalysis.ai?.perspectives.away.map((item, index) => {
                      return (
                        <p className='list--item' key={index}>{item}</p>
                      )
                    })}
                  </td>
                </tr> 
            </tbody> 
          </table>  
            <div className='inner-section p-4 text_mode'>
              {dataAiAnalysis.ai?.bet.map((item, index) => {
                return (
                  <p className='list--item' key={index}>{item}</p>
                )
              })}
              <p className='mt-6 font-bold'>Dự đoán: {dataAiAnalysis.ai?.result}</p>
            </div> 
        </div> 

        {dataH2H.length > 0 && (
           <div className='matches__side-bar'> 
           <div className="inner-section px-4 py-6 mb-4">
             <p className="inner-section--title text-center">Lịch sử đối đầu</p>
             {dataH2H.map((item) => (
                 <div className="matches_details" key={item.fixtureId}>
                   <p className="mathches__item">
                     <Image className="mathches__logo mr-2" width={32} height={32} src={item.logoHome} alt={item.nameHome} /> 
                     {item.nameHome}
                   </p>
 
                   <div className="mathches__response">
                     <p className="mathches__score">
                       {item.scoreHome} : {item.scoreAway}
                     </p>
                     <p className="mathches__date">
                       {VNDateFormat(item.timeStart)}
                     </p>
                   </div>
                   
                   <p className="mathches__item">
                     {item.nameAway}
                     <Image className="mathches__logo ml-2" width={32} height={32} src={item.logoAway} alt={item.nameAway} /> 
                   </p>
                 </div>
               ))}
           </div>
         </div>
        )}
       
      </div>
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

export default MatchesComponent;
