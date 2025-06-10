// компонент модального окна фильма
function MovieModal({ data, closeModal }) {
    return (
      <div className="modal modal--show" onClick={closeModal}>
        <div className="modal__card" onClick={(e) => e.stopPropagation()}>
          <img className="modal__movie-backdrop" src={data.posterUrl} alt="" />
          <h2>
            <span className="modal__movie-title">{data.nameRu}</span>
            <span className="modal__movie-release-year"> : {data.year} год </span>
          </h2>
          <ul className="modal__movie-info">
            <li className="modal__movie-genre">
              Жанр: {data.genres.map((el, i) => (
                <span key={i}>{el.genre}{i < data.genres.length - 1 ? ', ' : ''}</span>
              ))}
            </li>
            <li>Сайт: <a className="modal__movie-site" href={data.webUrl}>{data.webUrl}</a></li>
            <li className="modal__movie-overview">Описание: {data.description}</li>
          </ul>
          <button type="button" className="modal__button-close" onClick={closeModal}>Закрыть</button>
        </div>
      </div>
    );
  }
  
  export default MovieModal;
  
