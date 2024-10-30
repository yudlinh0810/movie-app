import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './store/movieoSlice';

function App() {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('/trending/all/week');

      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log('err fetchTrendingData', error);
    }
  };
  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/configuration');
      dispatch(setImageURL(response.data.images.secure_base_url + 'original'));
    } catch (error) {
      console.log('err fetchConfiguration', error);
    }
  };
  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <main className='grid min-h-[100dvh]'>
      <Header />
      <div className=''>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
