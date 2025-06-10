// Pagination.jsx — компонент постраничной навигации
function Pagination({ currentPage, setCurrentPage, totalPages }) {
    return (
      <div className="pagination">
        {/* Создаёт массив длиной totalPages.
        (_, i) — i это номер итерации (от 0 до totalPages - 1). */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            // className включает active, если эта кнопка — текущая страница.
            // onClick — при нажатии вызывается setCurrentPage с новым номером страницы.
            // i + 1 — так как i начинается с 0, добавляем 1, чтобы страница начиналась с 1.
            className={`pagination__button ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  }
  
  export default Pagination;
  