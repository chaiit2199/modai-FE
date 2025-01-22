import { useEffect, useState } from 'react';
import Image from 'next/image'
import { DateFormat } from '@/utils';
import Countdown from '@/components/Countdown';
import { listMatch } from '@/pages/api/getListApi';

const tab = "upcoming";
const date = new Date();

function HeaderBannerComponent({ size = 'default', fixtureId }) {
  const isSmall = size === 'small';

  // State to store the match data, fetch status, and win percentage
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null); // Start with null for the data
  const [winH, setWinPercentageHome] = useState(0); // Home team win percentage
  const [winA, setWinPercentageAway] = useState(0); // Away team win percentage
  const [isMounted, setIsMounted] = useState(false); // To check if the component is mounted

  // Fetch match data function
  const fetchData = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const { success, data: dataRes } = await listMatch(tab, DateFormat(date));
      if (success && Array.isArray(dataRes)) {
        let data;

        if (fixtureId) {
          const filteredData = dataRes.filter((item) => item.fixtureId == fixtureId);
          [data] = filteredData.length > 0 ? filteredData : dataRes;
        } else {
          [data] = dataRes;
        }

        const homeWinPercentage = (1 / data.oddHome) * 100;
        const awayWinPercentage = (1 / data.oddAway) * 100;
        setWinPercentageHome(homeWinPercentage);
        setWinPercentageAway(awayWinPercentage);

        setData(data);
      } else {
        console.error("Expected an array but received:", dataRes);
      }
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    // Set isMounted to true after the component mounts
    setIsMounted(true);
    fetchData();
  }, []);

  const getColor = (percentage) => {
    return percentage > 50 ? '#8CC5B3' : '#F1F5F9';
  };

  if (!isMounted) return (
    <div className={`banner-component ${isSmall ? 'banner-small' : ''}`}>
      <div className="overlay">
        <Image src="/images/banner/banner_bg.jpg" alt="Banner Background" />
      </div>
      <div className="container-inner flex flex-col justify-center">
        <div className="banner-component__inner">
        </div>
      </div>
    </div>
  );

  return (
    <div className={`banner-component ${isSmall ? 'banner-small' : ''}`}>
      <div className="overlay">
        <Image src="/images/banner/banner_bg.jpg" alt="Banner Background" />
      </div>
      <div className="container-inner flex flex-col justify-center">
        <div className="banner-component__inner">
          <div className="banner-component__content " data-aos="fade-right" data-aos-delay="500">
            <div className='banner-component--main'>
              {data ? (
                <div className='leagueName'>
                  <Image src={data.leagueLogo} alt="" />
                  {data.leagueName}
                </div>
              ) : (
                <div>Loading...</div>
              )}
              <div className='table_wrap'>
                {data && (
                  <table>
                    <thead>
                      <tr>
                        <th>Home</th>
                        <th>Away</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className='flex items-center'>
                            <Image src={data.logoHome} alt="" />
                            {data.nameHome}</div>
                        </td>
                        <td>
                          <div className='flex items-center'>
                            <Image className='mr-2 w-7 h-7' src={data.logoAway} alt="" />
                            {data.nameAway}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                <div className="banner-component__options">
                  <div style={{ width: `${winH}%`, backgroundColor: getColor(winH) }}></div>
                  <div style={{ width: `${winA}%`, backgroundColor: getColor(winA) }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-component__countdown " data-aos="fade-left" data-aos-delay="500">
            <Countdown time={data ? data.timeStart : null} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default HeaderBannerComponent;
