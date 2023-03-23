import classes from "./PaginatedContainer.module.css";
import ShareButton from "../common/ShareButton";

interface PaginatedContainerProps {
  allPages?: number;
  searchParams?: URLSearchParams;
  setSearchParams?: any;
}

const PaginatedContainer = ({
  allPages,
  searchParams,
  setSearchParams,
}: PaginatedContainerProps) => {
  return (
    <div className={classes.container__paginated}>
      <ShareButton
        type="button"
        dataTestId={"pagination-button__left"}
        disabled={
          searchParams?.get("page") === "1" || !searchParams?.get("page")
        }
        onClick={() => {
          searchParams?.set(
            "page",
            String(Number(searchParams?.get("page")) - 1),
          );
          setSearchParams(searchParams);
        }}
      >
        &larr;
      </ShareButton>
      {new Array(allPages).fill(0).map((_, index) => (
        <ShareButton
          type="button"
          dataTestId={index + 1}
          key={index}
          style={{
            color:
              Number(searchParams?.get("page") || 1) === index + 1
                ? "red"
                : "#fff",
          }}
          onClick={() => {
            searchParams?.set("page", String(index + 1));
            setSearchParams(searchParams);
          }}
        >
          {index + 1}
        </ShareButton>
      ))}
      <ShareButton
        type="button"
        dataTestId="pagination-button__right"
        disabled={Number(searchParams?.get("page")) === allPages || !allPages}
        onClick={() => {
          searchParams?.set(
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
