export const renderPageNumbers = (currentPage, totalPages, setCurrentPage) => {
  const pageNumbers = [];
  const ellipsis = <span>...</span>;
  
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
  } else {
    if (currentPage <= 2) {
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
      pageNumbers.push(ellipsis);
    } else if (currentPage >= totalPages - 1) {
      pageNumbers.push(ellipsis);
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
    } else {
      pageNumbers.push(ellipsis);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
      pageNumbers.push(ellipsis);
    }
  }

  return pageNumbers;
};