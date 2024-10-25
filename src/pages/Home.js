import BannerHome from '../components/BannerHome';
import { useSelector } from 'react-redux';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const trendingData = useSelector((state) => state.movieoData.bannerData);
  const { data: nowPlayingData } = useFetch('/movie/now_playing');
  const { data: topRateData } = useFetch('/movie/top_rated');
  const { data: popularTVShowData } = useFetch('/tv/popular');
  const { data: onAirShowData } = useFetch('/tv/on_the_air');
  return (
    <div>
      <div>
        <BannerHome />
        <HorizontalScrollCard data={trendingData} heading={'Trending'} trending={true} />
        <HorizontalScrollCard data={nowPlayingData} heading={'Now Playing'} media_type={'movie'} />
        <HorizontalScrollCard data={topRateData} heading={'Top Rate Movies'} media_type={'movie'} />
        <HorizontalScrollCard
          data={popularTVShowData}
          heading={'Popular TV Show'}
          media_type={'tv'}
        />
        <HorizontalScrollCard
          data={onAirShowData}
          heading={'TV shows that air in the next 7 days'}
          media_type={'tv'}
        />
      </div>
    </div>
  );
};

export default Home;
