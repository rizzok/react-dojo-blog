import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource');
          }
          return res.json();
        })
        .then((data) => {
          if (isMounted) {
            setData(data);
            setIsPending(false);
            setError(null);
          }
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
