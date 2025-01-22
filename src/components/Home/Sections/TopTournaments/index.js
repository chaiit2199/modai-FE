import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { list } from '@/pages/api/getListApi';

function TopTournaments() {
  const { t } = useTranslation();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { success, data: dataRes } = await list();
    if (success) {
      setTournaments(dataRes);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderLoading = () => (
    <div className="loading-message">
      <p>Loading tournaments...</p>
    </div>
  );

  return (
    <>
      {loading ? (
        renderLoading()
      ) : (
        <div className="inner-section py-2 mb-4">
          <div className="list-item-tournament">
            {tournaments.map((item, index) => (
              <Link href={`/leagues?tab=standings&id=${item.leagueId}`} key={item.leagueId}>
                <div className="item-inner">
                  <Image src={item.logo} alt="images" width={16} height={16} /> {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>

  );
}

export default TopTournaments;
