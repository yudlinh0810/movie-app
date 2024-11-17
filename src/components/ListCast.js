import React, { memo } from 'react';

const ListCast = ({ listCast, param, imageURL }) => {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,80px)] gap-6 mt-2'>
      {listCast?.cast
        ?.filter((cast) => cast?.profile_path !== null)
        ?.map((cast, index) => {
          return (
            <div key={index + param.explore + cast.id}>
              <img
                src={imageURL + cast?.profile_path}
                alt={cast?.name}
                className='h-20 w-20 rounded-[24px] object-cover'
              />
              <p className='font-bold text-center text-sm'>{cast?.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default memo(ListCast);
