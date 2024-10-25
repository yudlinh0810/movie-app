import React, { useEffect, useState } from 'react';

const Time = () => {
  let [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <p className='cursor-context-menu hover:text-neutral-100'>
      {time.toLocaleTimeString().split(' ')[0]}
    </p>
  );
};

export default Time;
