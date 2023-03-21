export const orderHandler = (
  queryId: string,
  queryTime: string,
  searchParams: URLSearchParams,
  setSearchParams: any,
  e: React.BaseSyntheticEvent,
) => {
  if (e.target.abbr === "id") {
    if (queryId) {
      searchParams.delete("id");
      setSearchParams(searchParams);
    } else {
      searchParams.append("id", "desc");
      searchParams.delete("transaction_time");
      setSearchParams(searchParams);
    }
  }

  if (e.target.abbr === "transaction_time") {
    if (queryTime) {
      searchParams.delete("transaction_time");
      setSearchParams(searchParams);
    } else {
      searchParams.append("transaction_time", "desc");
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  }
};
