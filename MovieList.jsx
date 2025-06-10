// MovieList.jsx — компонент списка фильмов
function MovieList({ movies, openModal }) {
    const getClassByRate = (vote) => {
      if (vote >= 7) return "green";
      else if (vote > 5) return "orange";
      else return "red";
    };
  
    return (
      <div className="movies">
        {movies.map((movie) => (
          <div className="movie" key={movie.filmId} onClick={() => openModal(movie.filmId)}>
            <div className="movie__cover-inner">
              <img src={movie.posterUrlPreview} className="movie__cover" alt={movie.nameRu} />
              <div className="movie__cover--darkened"></div>
            </div>
            <div className="movie__info">
              <div className="movie__title">{movie.nameRu}</div>
              <div className="movie__category">{movie.genres.map((g) => g.genre).join(', ')}</div>
              {movie.rating && (
                <div className={`movie__average movie__average--${getClassByRate(movie.rating)}`}>
                  {movie.rating}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default MovieList;
  
