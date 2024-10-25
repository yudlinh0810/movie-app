import moment from 'moment';
import React from 'react';
import { MdOutlineError } from 'react-icons/md';
import { PiStarThin } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Card = ({ data, trending, media_type, index }) => {
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const mediaType = data.media_type ?? media_type;
  return (
    <Link
      to={'/' + mediaType + '/' + data.id}
      className='w-full min-w-[230px] max-w-[240px] h-80 overflow-hidden block rounded relative hover:scale-105'
    >
      {data.backdrop_path !== null ? (
        <img
          className='w-full h-full object-cover'
          src={imageURL + data.backdrop_path}
          alt={data.title || data.name}
        />
      ) : (
        <p className='h-full grid items-center justify-center text-lg'>
          Path Image Error{' '}
          <MdOutlineError color='yellow' size={50} className='absolute top-20 left-[100px]' />
        </p>
      )}
      <div className='absolute top-2 left-2 text-blue-200'>
        {trending && (
          <div>
            <p className='bg-gradient-to-t from-blue-700 to-blue-400 text-sm p-1 rounded-md'>
              #{index} Trending
            </p>
          </div>
        )}
      </div>
      <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-gray-600/30 p-2'>
        <h2 className='text-white text-ellipsis line-clamp-1 text-lg'>{data.title || data.name}</h2>
        <div className='text-sm text-neutral-200 flex justify-between'>
          <p>{moment(data.release_date).format('DD/MM/YYYY')}</p>
          <p className='flex'>
            {Number(data.vote_average).toFixed(1)}
            <PiStarThin className='relative top-0.5 left-0.5 text-yellow-300' />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
