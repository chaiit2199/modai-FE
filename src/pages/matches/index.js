
import { useState, useEffect, useRef } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSearchParams, useRouter } from 'next/navigation';

import HeaderBannerComponent from '@/components/HeaderBanner';
import Layout from '@/components/layout';

import { listMatch } from '@/pages/api/getListApi';
import { DateFormat, VNDateFormat } from '@/utils';

const MatchesComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const params_id = searchParams.get("id")
  const tab = "completed";
  const date = new Date("2024-10-05");

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

  if (matches.length === 0) {
    return <div>No matches found</div>;
  }


  return (
    <Layout className="home-page bg-[#F4F4F4]">
      <HeaderBannerComponent fixtureId={params_id} />
      <div className='container-inner mt-10'>

        <h2 className='mb-6 uppercase text-center'>head-to-head record</h2>
        <div className='mb-20 container-small'>
          <div className='inner-section rounded-lg overflow-hidden pb-4 bg-white'>
            <div class="head-to-head">
              <div className='head-to-head--item'>
                Crystal Palace
                <img src="https://media.api-sports.io/football/teams/52.png" />
                <p className='response'>0</p>
              </div>
              <p className='response mx-4'>1</p>
              <div className='head-to-head--item'>
                <p className='response'>1</p>
                <img src="https://media.api-sports.io/football/teams/40.png" />
                Liverpool
              </div>
            </div>
            {
              matches?.map((item) => {
                return (
                  <div className='matches_item'>
                    <p className='date'>{VNDateFormat(item.timeStart)}</p>
                    <div className='item'><img src={item.logoHome} /> <p className='score'>{item.scoreHome} - {item.scoreAway}</p>  <img src={item.logoAway} /></div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <h2 className='mb-6 uppercase'>recent matches</h2>
        <div className='grid grid-cols-2 gap-10 mb-10'>
          <div>
            <div className='matches_title'><img src="https://media.api-sports.io/football/teams/52.png" />Crystal Palace</div>
            {
              matches?.map((item) => {
                return <div className='matches_item matches_inner'><div className='item'><img src={item.logoHome} /> <p className='score'>{item.scoreHome} - {item.scoreAway}</p>  <img src={item.logoAway} /></div></div>;
              })
            }
          </div>
          <div>
            <div className='matches_title'><img src="https://media.api-sports.io/football/teams/40.png" />Liverpool</div>
            {
              matches?.map((item) => {
                return <div className='matches_item matches_inner'><div className='item'><img src={item.logoHome} /> <p className='score'>{item.scoreHome} - {item.scoreAway}</p>  <img src={item.logoAway} /></div></div>;
              })
            }
          </div>
        </div>
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
