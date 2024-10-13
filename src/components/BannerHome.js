import React from 'react';
import { useSelector } from 'react-redux';

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);

  console.log('bannerData', bannerData);

  return (
    <div>
      {bannerData.map((item, index) => {
        return <p>{item.title}</p>;
      })}
    </div>
  );
};

export default BannerHome;
