'use client';

import { useState, useEffect, useRef } from 'react';
import { DateFormat } from '@/utils';
import Calendar from 'react-calendar';
import MatchComponent from '../Match';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { listMatch } from '@/pages/api/getListApi';
import { useTranslation } from 'react-i18next'; 

const FilterComponent = () => {
  const { t } = useTranslation();
  const today = new Date();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapseRef = useRef(null);
  const [MatchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());

  // Fetch match data
  const fetchMatchData = async () => {
    const { success, data: dataRes } = await listMatch(DateFormat(date));
    if (success && dataRes) {
      setMatchData(dataRes); 
      setLoading(false);
    } else {
      setLoading(true);
    }
  }; 
  
  useEffect(() => { 
    fetchMatchData();
    const intervalId =  setInterval(fetchMatchData, 30000);
    return () => intervalId && clearInterval(intervalId);
  }, [date]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleClickOutside = (event) => {
    if (collapseRef.current && !collapseRef.current.contains(event.target)) {
      setIsCollapsed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChangeDate = (newDate) => { 
    setDate(newDate);
  }
  const handleDayChange = (offset) => {
    setDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() + offset)));
  };

  const formattedDate = date.toLocaleDateString(
    useRouter().locale === 'en' ? 'en-US' : 'vi-VN',
    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <div className='col-span-3'>
      <div className='inner-section py-2 mb-4'>
        <div className="flex justify-between px-4">
          <button onClick={() => handleDayChange(-1)} className="px-2 w-[30px] h-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
              <path d="M198.608 246.104L382.664 62.04c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12C361.476 2.792 354.712 0 347.504 0s-13.964 2.792-19.028 7.864L109.328 227.008c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06L198.608 246.104z" fill="#fff" />
            </svg>
          </button>

          <div className="core_collapse" ref={collapseRef}>
            <div className="collapse__label py-3 justify-center cursor-pointer" onClick={toggleCollapse}>
              <p className="link">{formattedDate}</p>
            </div>
            {isCollapsed && (<Calendar onChange={handleChangeDate} value={date} />)}
          </div>

          <button onClick={() => handleDayChange(1)} className="px-2 w-[30px] h-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
              <path d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z" fill="#fff" />
            </svg>
          </button>
          <input className="hidden" type="text" value={date} readOnly />
        </div>
      </div>  
      {
        loading ? (
          <div className="inner-section p-6 text-center text_mode">
            Rất tiếc, không tìm thấy trận đấu cho ngày {formattedDate}
          </div>
        ) : (
          MatchData.map((item) => (
            <div key={item.fixtureId} className="inner-section overflow-hidden mb-4">
              <h6 className="f-match__title">
                <img className="f-match__logo" src={item.leagueLogo} alt="League Logo" />
                {item.leagueName} - {item.leagueCountry}
              </h6>
              <MatchComponent date={DateFormat(date)} item={item} key={item.idHome} />
            </div>
          ))
        )
      }
    </div >
  );
};

export default FilterComponent;
