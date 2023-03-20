import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LIMIT } from '@common/order';

import useData from '@hooks/useSortableTable';

import { PaginationProps } from '../../common/types';
import { Nav, PageButton } from './styled';

function Paginaton({ page, setPage }: PaginationProps) {
  const { tableData } = useData();
  const [_, setParams] = useSearchParams();

  const total = tableData.length;
  const offset = (page - 1) * LIMIT;
  const numPages = Math.ceil(total / LIMIT);

  useEffect(() => {
    const params = { offset: offset + '', limit: LIMIT + '' };
    setParams(params);
  }, [offset]);

  return (
    <Nav>
      <PageButton onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </PageButton>
      {Array(numPages)
        .fill(0)
        .map((_, i) => (
          <PageButton
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </PageButton>
        ))}
      <PageButton onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </PageButton>
    </Nav>
  );
}
export default Paginaton;
