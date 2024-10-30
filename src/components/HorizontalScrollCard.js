import React, { useRef } from 'react';
import Card from './Card';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();
  const handleNext = () => {
    const maxScrollLeft = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    if (containerRef.current.scrollLeft + 5 >= maxScrollLeft) {
      containerRef.current.scrollLeft = 0;
    } else {
      containerRef.current.scrollLeft += 1295;
    }
  };
  const handlePrevious = () => {
    const maxScrollLeft = containerRef.current.scrollWidth;
    if (containerRef.current.scrollLeft === 0) {
      containerRef.current.scrollLeft = maxScrollLeft;
    } else {
      containerRef.current.scrollLeft -= 1295;
    }
  };
  return (
    <div className='container w-[1295px] mx-auto px-3 my-10'>
      <h2 className='text-2xl font-bold mb-4 capitalize'>{heading}</h2>
      <div className='relative'>
        <div
          ref={containerRef}
          className='grid grid-cols-[repeat(auto-fit,_240px)] gap-5 grid-flow-col overflow-hidden relative z-10 scroll-smooth transition-all'
        >
          {data.map((item, index) => {
            return (
              <Card
                key={item.id + 'heading' + index}
                data={item}
                trending={trending}
                index={index + 1}
                media_type={media_type}
              />
            );
          })}
        </div>
        <div className='absolute top-0 w-full h-full flex items-center justify-between'>
          <button
            onClick={handlePrevious}
            className='bg-gradient-to-t from-blue-700 to-blue-400 transition-all hover:scale-105 text-white rounded-full text-[24px] -ml-2 z-10'
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className='bg-gradient-to-t from-blue-700 to-blue-400 transition-all hover:scale-105 text-white rounded-full text-[24px] -mr-2 z-10'
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
