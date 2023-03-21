import { CustomerType } from "../types/customer.types";

export const filterData = (
  data: CustomerType[],
  queryId: string,
  queryTime: string,
  querySearch: string,
  queryStatus: string,
) => {
  return (
    data
      ?.sort((a, b): any => {
        if (queryId) {
          return b.id - a.id;
        } else {
          return a.id - b.id;
        }
      })
      .sort((a, b): any => {
        if (queryTime) {
          return b.transaction_time.localeCompare(a.transaction_time);
        } else {
          return data;
        }
      })
      .filter((item) => {
        if (querySearch) {
          return item.customer_name
            .toLowerCase()
            .includes(querySearch.toLowerCase());
        } else {
          return data;
        }
      })
      // eslint-disable-next-line array-callback-return
      .filter((item) => {
        if (queryStatus === "true") {
          return item.status === true;
        } else if (queryStatus === "false") {
          return item.status === false;
        } else {
          return data;
        }
      })
  );
};
