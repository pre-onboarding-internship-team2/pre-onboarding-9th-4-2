import { useSearchParams } from 'react-router-dom';

import { LIMIT, QueryStringKey } from '@common/order';

import useData from '@hooks/useData';

import { Nav, PageButton } from './styled';

function Paginaton() {
  const { todayData } = useData();
  const [params, setParams] = useSearchParams();
  const page = (Number(params.get(QueryStringKey.OFFSET)) + LIMIT) / LIMIT;

  const total = todayData.length;
  const numPages = Math.ceil(total / LIMIT);

  return (
    <Nav>
      <PageButton
        onClick={() => {
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
              const params = { offset: i * LIMIT + '', limit: LIMIT + '' };
              setParams(params);
              window.scrollTo(0, 0);
            }}
            aria-current={page - 1 === i ? 'page' : undefined}
          >
            {i + 1}
          </PageButton>
        ))}
      <PageButton
        onClick={() => {
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
