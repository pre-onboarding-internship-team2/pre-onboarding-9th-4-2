interface PaginationProps {
  currentPage: number;
  minPage: number;
  maxPage: number;
  onPageChange: (newPage: number) => Promise<void> | void;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  span?: number;
}

function Pagination({
  currentPage,
  maxPage,
  span,
  onPageChange,
  hasPrevPage,
  hasNextPage,
}: PaginationProps) {
  const pages = Array(maxPage)
    .fill(0)
    .map((_, index) => ({ key: index, page: index + 1 }));

  return (
    <tr>
      <td colSpan={span}>
        <ul className="order-list-table__pagination_list">
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!hasPrevPage}
            >
              이전
            </button>
          </li>
          {pages.map(({ page, key }) => (
            <li key={key}>
              <button
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={currentPage === page ? "active" : undefined}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!hasNextPage}
            >
              다음
            </button>
          </li>
        </ul>
      </td>
    </tr>
  );
}

export default Pagination;
