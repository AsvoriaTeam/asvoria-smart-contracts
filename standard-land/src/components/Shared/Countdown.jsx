import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        };
      }

      setTimeLeft(timeLeft);
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="">
      <p className="font-semibold text-[14px] text-[#a2a2a2]">
        <span className="font-semibold text-[14px] text-white">
          {String(timeLeft.days).padStart(2, "0")}d{" "}
          {String(timeLeft.hours).padStart(2, "0")}h{" "}
          {String(timeLeft.minutes).padStart(2, "0")}m
        </span>
      </p>
    </div>
  );
};

export default Countdown;
