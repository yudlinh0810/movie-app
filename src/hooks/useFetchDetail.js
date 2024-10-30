import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchDetail = (endpoint) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchDataDetail = async () => {
    try {
      setLoading(true);
      const detail = await axios.get(endpoint);
      setLoading(false);
      setData(detail.data);
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    fetchDataDetail();
  }, [endpoint]);

  return { data, loading };
};
export default useFetchDetail;
