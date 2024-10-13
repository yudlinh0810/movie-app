import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData } from './store/movieoSlice';

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

  useEffect(() => {
    fetchTrendingData();
  }, []);

  return (
    <main>
      <Header />
      <div className='pt-20'>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
