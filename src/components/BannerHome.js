import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { PiStarThin } from 'react-icons/pi';
import { useSelector } from 'react-redux';

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (currentImage >= 0 && currentImage < bannerData.length - 1) {
      setCurrentImage((pre) => pre + 1);
    } else {
      setCurrentImage(0);
    }
  };

  const handlePrevious = () => {
    if (currentImage === 0) {
      setCurrentImage(bannerData.length - 1);
    } else {
      setCurrentImage((pre) => pre - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage >= 0 && currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerData, currentImage]);
  return (
    <section className='w-full h-full'>
      <div className='flex'>
        {bannerData.map((item, index) => {
          return (
            <div
              key={index}
              className='min-w-full lg:min-h-full overflow-hidden relative '
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className='w-full h-full'>
                <img
                  src={imageURL + item?.backdrop_path}
                  alt='poster'
                  className='h-full w-full object-cover'
                />
              </div>
              {/*<< button next and previous item */}
              <div className='absolute top-0 w-full h-full items-center justify-between px-5 pb-[60px] flex'>
                <button
                  onClick={handlePrevious}
                  className='p-1 rounded-full text-xl z-10 bg-gradient-to-t from-blue-700 to-blue-400 transition-all hover:scale-105 text-white'
                >
                  <FaAngleLeft size={40} />
                </button>
                <button
                  onClick={handleNext}
                  className='p-1 rounded-full text-xl z-10 bg-gradient-to-t from-blue-700 to-blue-400 transition-all hover:scale-105 text-white'
                >
                  <FaAngleRight size={40} />
                </button>
              </div>
              {/* >> */}
              <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
              <div className='container mx-auto'>
                <div className='max-w-md w-full absolute bottom-[140px] px-3 ml-6'>
                  <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>
                    {item?.title || item?.name}
                  </h2>
                  <p className='break-words text-ellipsis line-clamp-5 my-2'>{item.overview}</p>
                  <div className='flex items-center gap-8 relative '>
                    <p>
                      Rating : {Number(item.vote_average).toFixed(1)}{' '}
                      <PiStarThin className='absolute top-1 left-[84px] text-yellow-300' />
                    </p>
                    <span>|</span>
                    <p>View: {Number(item?.popularity)}</p>
                  </div>
                  <button className='w-full font-bold bg-white text-black px-4 py-2 mt-4 rounded-xl hover:bg-gradient-to-l from-blue-700 to-blue-400 transition-all hover:scale-105 hover:text-white'>
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;
