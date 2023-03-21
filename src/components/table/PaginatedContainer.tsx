import ShareButton from "../common/ShareButton";

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
    <div className="button-container__paginated">
      <ShareButton
        type="button"
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
      </ShareButton>
      {new Array(allPages).fill(0).map((_, index) => (
        <ShareButton
          type="button"
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
        </ShareButton>
      ))}
      <ShareButton
        type="button"
        disabled={Number(searchParams.get("page")) === allPages || !allPages}
        onClick={() => {
          searchParams.set(
            "page",
            String(Number(searchParams.get("page")) + 1),
          );
          setSearchParams(searchParams);
        }}
      >
        &rarr;
      </ShareButton>
    </div>
  );
};

export default PaginatedContainer;
