import React from 'react';
import { IoMdClose } from 'react-icons/io';
import useFetchDetail from '../hooks/useFetchDetail';

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData } = useFetchDetail(`/${media_type}/${data?.id}/videos`);
  console.log('id', data?.id);
  console.log('trailer', videoData);
  return (
    <section className='fixed bg-neutral-500 top-0 right-0 bottom-0 left-0 bg-opacity-50 z-40 grid place-content-center'>
      <div className='bg-black w-full h-[76vh] max-w-screen-lg aspect-video relative m-auto'>
        <button
          onClick={close}
          className='absolute -bottom-10 right-1/2 text-3xl bg-white rounded-full'
        >
          <IoMdClose />
        </button>
        <iframe
          className='w-full h-full'
          title={videoData?.results?.name}
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default VideoPlay;
