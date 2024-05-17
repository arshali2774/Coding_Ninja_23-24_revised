import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [jokeData, setJokeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      const data = res.json();
      setJokeData(data);
    } catch (error) {
      setError('something went wrong');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJoke();
  }, [url]);

  return { jokeData, loading, error, fetchJoke };
}
