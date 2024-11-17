import React, { memo, useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { PiStarThin } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import VideoPlay from './VideoPlay';
import axios from 'axios';

const BannerHome = () => {
  const banners = useSelector((state) => state.movieoData.bannerData);
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const [movieData, setDataMovie] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [playVideoId, setPlayVideoId] = useState('');

  const handleNext = () => {
    if (currentImage >= 0 && currentImage < banners.length - 1) {
      setCurrentImage((pre) => pre + 1);
    } else {
      setCurrentImage(0);
    }
  };

  const handlePrevious = () => {
    if (currentImage === 0) {
      setCurrentImage(banners.length - 1);
    } else {
      setCurrentImage((pre) => pre - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage >= 0 && currentImage < banners.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImage, banners.length]);

  const handlePlayNow = (movie) => {
    setDataMovie(movie);
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (movieData) {
      const fetchVideo = async () => {
        try {
          const video = await axios.get(`/${movieData.media_type}/${movieData.id}`);
          setPlayVideoId(video.data);
        } catch (error) {
          console.error('Failed to fetch video data:', error);
        }
      };
      fetchVideo();
    }
  }, [movieData]);

  return (
    <section className='w-full h-full'>
      <div className='flex overflow-hidden'>
        {banners.map((item, index) => (
          <div
            key={item.id + 'bannerHome' + index}
            className='min-w-full lg:min-h-full overflow-hidden relative'
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            <div className='w-full h-full'>
              <img
                src={imageURL + item.backdrop_path}
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
            <div className='container mx-auto cursor-context-menu'>
              <div className='max-w-md w-full absolute bottom-[140px] px-3 ml-6'>
                <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>
                  {item.title || item.name}
                </h2>
                <p className='break-words text-ellipsis line-clamp-5 my-2'>{item.overview}</p>
                <div className='flex items-center gap-8 relative'>
                  <p>
                    Rating: {Number(item.vote_average).toFixed(1)}{' '}
                    <PiStarThin className='absolute top-1 left-[84px] text-yellow-300' />
                  </p>
                  <span>|</span>
                  <p>View: {Number(item.popularity)}</p>
                </div>
                <div>
                  <button
                    onClick={() => handlePlayNow(item)}
                    className='w-full font-bold bg-white text-black px-4 py-2 mt-4 rounded-xl hover:bg-gradient-to-l from-blue-700 to-blue-400 transition-all hover:scale-105 hover:text-white'
                  >
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isVisible && (
        <div onClick={() => setIsVisible(!isVisible)}>
          <VideoPlay
            data={playVideoId}
            close={() => {
              setIsVisible(false);
              setDataMovie('');
              setPlayVideoId('');
            }}
            media_type={movieData.media_type}
          />
        </div>
      )}
    </section>
  );
};

export default memo(BannerHome);
