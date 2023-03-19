import { useSearchParams } from "react-router-dom";
import { orderApiQueryKey, PAGINATION_PER_PAGE } from "../services/order";

export default function PaginationButtons({
  totalCount,
}: {
  totalCount: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumbers = Array(Math.floor(totalCount / PAGINATION_PER_PAGE))
    .fill(0)
    .map((_, i) => (i + 1).toString());

  const paginate = (pageNumber: string) => {
    searchParams.set(orderApiQueryKey.PAGE, pageNumber);
    setSearchParams(searchParams);
  };

  return (
    <>
      {pageNumbers.map((pageNumber) => (
        <button onClick={() => paginate(pageNumber)} key={`page ${pageNumber}`}>
          {pageNumber}
        </button>
      ))}
    </>
  );
}
