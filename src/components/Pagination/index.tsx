import useData from '@hooks/useSortableTable';

import { PaginationProps } from '../../common/types';
import { Nav, PageButton } from './styled';

function Paginaton({ limit, page, setPage }: PaginationProps) {
  const { tableData } = useData();
  const total = tableData.length;
  const numPages = Math.ceil(total / limit);

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
