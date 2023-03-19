import { Dispatch, SetStateAction } from "react";

interface PaginatedContainerProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  allPages: number;
}

const PaginatedContainer = ({
  page,
  setPage,
  allPages,
}: PaginatedContainerProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
        &larr;
      </button>
      {new Array(allPages).fill(0).map((_, index) => (
        <button
          key={index}
          style={{ color: page === index + 1 ? "red" : "black" }}
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={page === allPages}
        onClick={() => setPage((prev) => prev + 1)}
      >
        &rarr;
      </button>
    </div>
  );
};

export default PaginatedContainer;
