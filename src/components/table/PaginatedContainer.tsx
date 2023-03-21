interface PaginatedContainerProps {
  allPages: number;
  searchParams: URLSearchParams;
  setSearchParams: any;
}

const PaginatedContainer = ({
  allPages,
  searchParams,
  setSearchParams,
}: PaginatedContainerProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        disabled={searchParams.get("page") === "1" || !searchParams.get("page")}
        onClick={() => {
          searchParams.set(
            "page",
            String(Number(searchParams.get("page")) - 1),
          );
          setSearchParams(searchParams);
        }}
      >
        &larr;
      </button>
      {new Array(allPages).fill(0).map((_, index) => (
        <button
          key={index}
          style={{
            color:
              Number(searchParams.get("page") || 1) === index + 1
                ? "red"
                : "black",
          }}
          onClick={() => {
            searchParams.set("page", String(index + 1));
            setSearchParams(searchParams);
          }}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={Number(searchParams.get("page")) === allPages}
        onClick={() => {
          searchParams.set(
            "page",
            String(Number(searchParams.get("page")) + 1),
          );
          setSearchParams(searchParams);
        }}
      >
        &rarr;
      </button>
    </div>
  );
};

export default PaginatedContainer;
