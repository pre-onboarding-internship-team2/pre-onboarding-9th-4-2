import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LIMIT } from '@common/order';

import useData from '@hooks/useData';

import { PaginationProps } from '../../common/types';
import { Nav, PageButton } from './styled';

function Paginaton({ page, setPage }: PaginationProps) {
  const { todayData } = useData();
  const [_, setParams] = useSearchParams();

  const total = todayData.length;
  const numPages = Math.ceil(total / LIMIT);

  return (
    <Nav>
      <PageButton
        onClick={() => {
          setPage(page - 1);
          const params = { offset: (page - 1) * LIMIT + '', limit: LIMIT + '' };
          setParams(params);
          window.scrollTo(0, 0);
        }}
        disabled={page === 1}
      >
        &lt;
      </PageButton>
      {Array(numPages)
        .fill(0)
        .map((_, i) => (
          <PageButton
            key={i + 1}
            onClick={() => {
              setPage(i + 1);
              const params = { offset: i * LIMIT + '', limit: LIMIT + '' };
              setParams(params);
              window.scrollTo(0, 0);
            }}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </PageButton>
        ))}
      <PageButton
        onClick={() => {
          setPage(page + 1);
          const params = { offset: page * LIMIT + '', limit: LIMIT + '' };
          setParams(params);
          window.scrollTo(0, 0);
        }}
        disabled={page === numPages}
      >
        &gt;
      </PageButton>
    </Nav>
  );
}
export default Paginaton;
