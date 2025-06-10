// хук для загрузки списка жанров
import { useEffect, useState } from 'react';

function useGenres(apiKey) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films/filters", {
          headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Ошибка загрузки жанров:", err);
      }
    };

    fetchGenres();
  }, [apiKey]);

  return genres;
}

export default useGenres;
