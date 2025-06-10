// компонент с логотипом, поиском и выбором жанров
function Header({
    searchValue,
    setSearchValue,
    handleSearch,
    genres,
    selectedGenre,
    handleGenreChange,
  }) {
    return (
      <header className="container">
        <div className="header__content">
         {/* a href="#" — ссылка, якобы ведущая на главную.
        className="header__logo" — стиль логотипа.
        onClick={() => window.location.reload()} — при клике происходит перезагрузка страницы (обновляет весь сайт).  */}
          <a href="#" className="header__logo" onClick={() => window.location.reload()}>На главную</a>
          {/* form onSubmit={handleSearch} — при отправке формы вызывается handleSearch */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="header__search"
              placeholder="Поиск"
              // value={searchValue} — текущее значение из состояния.
              // onChange={(e) => setSearchValue(e.target.value)} — при каждом вводе обновляем searchValue.
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
          <form className="filter-form">
          {/* select — выпадающий список для выбора жанра:
          value={selectedGenre} — выбранное значение.
          onChange={handleGenreChange} — при изменении вызывается обработчик. */}
            <select className="genre__select" value={selectedGenre} onChange={handleGenreChange}>
              <option value="">жанры</option>
              {/* {genres.map(...)} — динамически добавляем жанры:
              key={genre.id} — уникальный ключ для React.
              value={genre.id} — значение, отправляемое при выборе.
              {genre.genre} — текст, видимый пользователю. */}
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.genre}</option>
              ))}
            </select>
          </form>
        </div>
      </header>
    );
  }
  
  export default Header;
  