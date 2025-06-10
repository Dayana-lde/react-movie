// хук для загрузки данных
import { useEffect, useState } from 'react';

function useFetchData(url, apiKey) {
  const [data, setData] = useState([]);
  // useEffect срабатывает при изменении url или apiKey.
  // isMounted — защита от установки данных, если компонент размонтирован.
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        if (isMounted) {
          const films = json.films || json.items || [];
          setData(films);
        }
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [url, apiKey]);

  return data;
}

export default useFetchData;
