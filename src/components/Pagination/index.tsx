import { PaginationProps } from '../../types/type';
import { Nav, Button } from './styled';
import { LIMIT } from '@consts/pagination.consts';

function Paginaton({ total, page, setPage }: PaginationProps) {
  const numPages = Math.ceil(total / LIMIT);

  return (
    <Nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {Array(numPages)
        .fill(0)
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </Button>
        ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </Nav>
  );
}
export default Paginaton;
