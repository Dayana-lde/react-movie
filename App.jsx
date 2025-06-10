// App.jsx — главный файл приложения
import { useState } from 'react';
import { useRef } from 'react';
import Header from './Header.jsx';
import MovieList from './MovieList.jsx';
import Pagination from './Pagination.jsx';
import MovieModal from './MovieModal.jsx';
import useFetchData from './UseFetchData.js';
import useGenres from './useGenres.js';
import './index.css';

const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
const API_URL_BY_GENRE = "https://kinopoiskapiunofficial.tech/api/v2.2/films";
const moviesPerPage = 8;

function App() {
  const genreChangeCount = useRef(0);
  const [searchValue, setSearchValue] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [modalData, setModalData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const genres = useGenres(API_KEY); // кастомный хук для загрузки жанров

  const url = searchValue.trim()
    ? `${API_URL_SEARCH}${searchValue.trim()}`
    : selectedGenre
    ? `${API_URL_BY_GENRE}?genres=${selectedGenre}&page=1`
    : API_URL_POPULAR;

  const movies = useFetchData(url, API_KEY); // универсальный хук для загрузки данных

  const filteredMovies = movies.slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setSelectedGenre('');
      setCurrentPage(1);
    }
  };

  const handleGenreChange = (e) => {
    genreChangeCount.current += 1; // увеличиваем счётчик
    console.log("Жанр менялся раз:", genreChangeCount.current); // для проверки
    setSelectedGenre(e.target.value);
    setSearchValue('');
    setCurrentPage(1);
  };

  const openModal = async (id) => {
    const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
    });
    const data = await resp.json();
    setModalData(data);
    document.body.classList.add('stop-scrolling');
  };

  const closeModal = () => {
    setModalData(null);
    document.body.classList.remove('stop-scrolling');
  };

  return (
    <div>
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        genres={genres}
        selectedGenre={selectedGenre}
        handleGenreChange={handleGenreChange}
      />
      <div className="container">
        <MovieList movies={filteredMovies} openModal={openModal} />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
      {modalData && <MovieModal data={modalData} closeModal={closeModal} />}
    </div>
  );
}

export default App;




