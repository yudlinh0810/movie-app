import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';

const ExplorePage = () => {
  const param = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNumber, setTotalPageNumber] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${param.explore}`, {
        params: {
          page: pageNumber,
        },
      });
      setData((preve) => {
        return [...preve, ...response.data.results];
      });
      setTotalPageNumber(response.data.total_pages);
      console.log('res', response.data.results);
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
  }, [param.explore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='pt-[82px]'>
      <div className='container mx-auto'>
        <h3 className='capitalize my-3 text-lg font-semibold'>Popular {param.explore}</h3>
        <div className='grid justify-center grid-cols-[repeat(auto-fit,_240px)] gap-6'>
          {data.map((exploreData, index) => {
            return (
              <Card
                data={exploreData}
                key={exploreData.id + 'exploreSection' + index}
                media_type={param.explore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
