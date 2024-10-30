import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchDetail from '../hooks/useFetchDetail';
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import { PiStarThin } from 'react-icons/pi';
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScrollCard from '../components/HorizontalScrollCard';

const DetailPage = () => {
  const param = useParams();
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const { data } = useFetchDetail(`/${param?.explore}/${param?.id}`);
  const { data: castData } = useFetchDetail(`/${param?.explore}/${param?.id}/credits`);
  const { data: similarData } = useFetch(`/${param?.explore}/${param?.id}/similar`);
  const { data: recommentdationData } = useFetch(`/${param?.explore}/${param?.id}/recommendations`);
  console.log('data', data);
  console.log('cast', castData);
  console.log('similar', similarData);
  const duration = (data?.runtime / 60)?.toFixed(1)?.split('.');
  const Story = castData?.crew
    .filter((el) => el.job === 'Story')
    .map((el) => el?.name)
    .join(', ');
  console.log('Story', Story);
  return (
    <div>
      <div className='w-full h-[280px] relative'>
        <div className='w-full h-full '>
          <img src={imageURL + data?.backdrop_path} alt='' className='w-full h-full object-cover' />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/80 to-transparent'></div>
      </div>
      <div className='container mx-auto px-5 flex gap-10'>
        <div className='-mt-28 relative w-fit min-w-60'>
          <img
            src={imageURL + data?.poster_path}
            alt=''
            className='h-80 w-60 object-cover rounded-xl'
          />
        </div>
        <div className=''>
          <h2 className='text-4xl font-bold text-white/90'>{data?.title || data?.name}</h2>
          <p>{data?.tagline}</p>
          <div className='relative flex my-2 gap-7'>
            <p>
              Rating : {Number(data?.vote_average).toFixed(1)}{' '}
              <PiStarThin className='absolute top-1 left-[84px] text-yellow-300' />
            </p>
            <span>|</span>
            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration :{' '}
              {data?.runtime ? `${duration[0]} hours ${duration[1]} minutes` : 'undetermined'}
            </p>
          </div>
          <Divider padding={0.7} />
          <div className='w-[1166px]'>
            <h3 className='text-xl font-bold text-white/70 mb-2'>Overview</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className='flex gap-7 mt-1'>
              <p>Status : {data?.status}</p>
              <span>|</span>
              <p>{`Release date: ${moment(data?.release_date).format('DD-MM -YYYY')}`}</p>
            </div>
          </div>
          <Divider />
          <div>
            <p>
              <span className='text-white/70'>Director:</span> {castData?.crew[0]?.name}
            </p>
            <p>
              <span className='text-white/70'>Write:</span> {Story}
            </p>
          </div>
          <Divider padding={0.2} />
          <h2>Cast</h2>
          <div className='grid grid-cols-[repeat(auto-fit,80px)] gap-6 mt-2'>
            {castData?.cast
              ?.filter((cast) => cast?.profile_path !== null)
              ?.map((cast, index) => {
                return (
                  <div>
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
        </div>
      </div>
      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={'Similar ' + param.explore}
          media_type={param.explore}
        />
        <HorizontalScrollCard
          data={recommentdationData}
          heading={'Recommentdations ' + param.explore}
          media_type={param.explore}
        />
      </div>
    </div>
  );
};

export default DetailPage;
