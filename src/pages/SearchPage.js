import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [totalData, setTotalData] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: location.search.slice(3),
          page: 1,
        },
      });
      setData((preve) => {
        return [...preve, ...response.data.results];
      });
      setTotalPageNumber(response.data.total_pages);
      setTotalData(response.data.total_results);
    } catch (error) {
      console.log('err', error);
    }
  };
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNumber((preve) => preve + 1);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(1);
    setData([]);
    fetchData();
  }, [location.state]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className='pt-[82px]'>
      <div className=''>
        <h3 className='capitalize my-3 text-lg font-semibold'>Search Results {totalData}</h3>
        <div className='grid justify-center grid-cols-[repeat(auto-fit,_240px)] gap-6'>
          {data.map((searchData, index) => {
            return (
              <Card
                data={searchData}
                key={searchData.id + 'exploreSection' + index}
                media_type={searchData.media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
