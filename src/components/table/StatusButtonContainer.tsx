import ShareButton from "../common/ShareButton";

interface StatusButtonContainerProps {
  searchParams: URLSearchParams;
  setSearchParams: any;
}

const StatusButtonContainer = ({
  searchParams,
  setSearchParams,
}: StatusButtonContainerProps) => {
  const changeStatusHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    if (name === "status__true") {
      searchParams.set("status", "true");
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    } else if (name === "status__false") {
      searchParams.set("status", "false");
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    } else if (name === "status__reset") {
      searchParams.delete("status");
      setSearchParams(searchParams);
    }
  };
  return (
    <div>
      <ShareButton
        name="status__true"
        type="button"
        onClick={changeStatusHandler}
      >
        Status True
      </ShareButton>
      <ShareButton
        name="status__false"
        type="button"
        onClick={changeStatusHandler}
      >
        Status False
      </ShareButton>
      <ShareButton
        name="status__reset"
        type="button"
        onClick={changeStatusHandler}
      >
        Status Reset
      </ShareButton>
    </div>
  );
};

export default StatusButtonContainer;
