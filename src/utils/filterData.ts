import { CustomerType } from "../types/customer.types";

export const filterData = (
  data: CustomerType[],
  queryId: string,
  queryTime: string,
  querySearch: string,
  queryStatus: string,
) => {
  return data
    ?.sort((a, b) => {
      if (queryId) {
        return b.id - a.id;
      }
      if (queryTime) {
        return b.transaction_time.localeCompare(a.transaction_time);
      }

      return a.id - b.id;
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
    .filter((item) => {
      if (queryStatus === "true") {
        return item.status === true;
      } else if (queryStatus === "false") {
        return item.status === false;
      } else {
        return data;
      }
    });
};
