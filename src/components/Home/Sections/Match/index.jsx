import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { TimeFormat } from '@/utils';
import { useRouter } from 'next/navigation';

const MatchComponent = React.memo(({ item, date }) => {
  const [isScoreHomeUpdated, setIsScoreHomeUpdated] = useState(false);
  const [isScoreAwayUpdated, setIsScoreAwayUpdated] = useState(false);
  const [prevScoreHome, setPrevScoreHome] = useState(item.scoreHome);
  const [prevScoreAway, setPrevScoreAway] = useState(item.scoreAway);
  const router = useRouter();


  useEffect(() => {
    setPrevScoreHome(item.scoreHome);
    setPrevScoreAway(item.scoreAway);
  }, [item]);

  useEffect(() => {
    if (item.scoreHome !== prevScoreHome) {
      setIsScoreHomeUpdated(true);

      const timeout = setTimeout(() => {
        setIsScoreHomeUpdated(false);
      }, 10000);

      setPrevScoreHome(item.scoreHome);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [item.scoreHome]);

  useEffect(() => {
    if (item.scoreAway !== prevScoreAway) {
      setIsScoreAwayUpdated(true);

      const timeout = setTimeout(() => {
        setIsScoreAwayUpdated(false);
      }, 5000);

      setPrevScoreAway(item.scoreAway);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [item.scoreAway]);

  const handleRedirect = (id) => {
    router.push(`/matches?id=${id}&date=${date}`);
  };

  return (
    <div key={item.idAway} className={`f-match ${item.status !== "FT" ? "match_upcoming" : ""}`}  onClick={() => item.status !== "FT" && handleRedirect(item.fixtureId)}>
      <div className='f-match__item'>
        {item.oddHome && <p className='finalOdd'>{item.oddHome}</p>}
        <p className='flex items-center justify-end ml-auto'>
          {item.nameHome}
          <Image className='ml-2 f-match__logo' width={32} height={32} src={item.logoHome} alt={item.nameHome} />
        </p>
      </div>
      <div className='f-match__score'>
        {item.status === "FT" ? (
          <p className='f-match__score__status flex items-center'>
            <span className={isScoreHomeUpdated ? 'goal' : ''}>{item.scoreHome}</span> - <span className={isScoreAwayUpdated ? 'goal' : ''}>{item.scoreAway}</span>
          </p>
        ) : (
          <span>{TimeFormat(item.timeStart)}</span>
        )}
      </div>
      <div className='f-match__item'>
        <p className='flex items-center justify-start'>
          <Image className='mr-2 f-match__logo' width={32} height={32} src={item.logoAway} alt={item.nameAway} />
          {item.nameAway}
          
        </p>
        {item.oddAway && <p className="finalOdd ml-auto">{item.oddAway}</p>}
      </div>
    </div>
  );
});

export default MatchComponent;
