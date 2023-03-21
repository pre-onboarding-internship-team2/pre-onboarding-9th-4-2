import React, { useState } from "react";

interface PaginationProps {
  minPage: number;
  maxPage: number;
  onPageChange: (newPage: number) => Promise<void>;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  span?: number;
}

function Pagination({
  maxPage,
  span,
  onPageChange,
  hasPrevPage,
  hasNextPage,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = Array(maxPage)
    .fill(0)
    .map((_, index) => ({ key: index, page: index + 1 }));

  const onClick = (page: number) => {
    onPageChange(page);
    setCurrentPage(page);
  };
  return (
    <tr>
      <td colSpan={span}>
        <ul className="order-list-table__pagination_list">
          <li>
            <button
              onClick={() => onClick(currentPage - 1)}
              disabled={!hasPrevPage}
            >
              이전
            </button>
          </li>
          {pages.map(({ page, key }) => (
            <li key={key}>
              <button
                onClick={() => onClick(page)}
                className={currentPage === page ? "active" : undefined}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => onClick(currentPage + 1)}
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
