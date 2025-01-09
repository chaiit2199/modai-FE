import React, { useEffect, useState } from 'react';
import { DateFormat, VNDateFormat } from '@/utils';
const Countdown = ({ time }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(time).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime() + 7 * 60 * 60 * 1000;
      const distance = Math.max(targetDate - now, 0);
      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const formatNumber = (number) => (number < 10 ? `0${number}` : number);

  return (
    <div className='countdown__wrapper'>
      <p className='date'>{VNDateFormat(time)}</p>
      <div className="countdown" >
        <FlipUnit number={formatNumber(timeLeft.hours)} label="Hours" />
        <FlipUnit number={formatNumber(timeLeft.minutes)} label="Minutes" />
        <FlipUnit number={formatNumber(timeLeft.seconds)} label="Second" />
      </div>
    </div>
  );
};

const FlipUnit = ({ number, label }) => {
  const [currentNumber, setCurrentNumber] = useState(number);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (currentNumber !== number) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
        setCurrentNumber(number);
      }, 600); // Adjust to match animation duration
    }
  }, [number, currentNumber]);

  return (
    <div className="flip-unit">
      <div className={`flip-card ${isFlipping ? 'flipping' : ''}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">{currentNumber}</div>
          <div className="flip-card-back">{number}</div>
        </div>
      </div>
      <div className="flip-label">{label}</div>
    </div>
  );
};

export default Countdown;
