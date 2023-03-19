import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  fetchGetOrderList,
  orderApiQueryKey,
  SortType,
  StatusType,
} from "../services/order";

export const useOrderTableFunctions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get(orderApiQueryKey.SORT) as SortType;
  const status = searchParams.get(orderApiQueryKey.STATUS) as StatusType;

  const sortById = () => {
    switch (sort) {
      case "ID_DES":
        searchParams.set(orderApiQueryKey.SORT, "ID_ASC");
        break;
      case "ID_ASC":
        searchParams.delete(orderApiQueryKey.SORT);
        break;
      default:
        searchParams.set(orderApiQueryKey.SORT, "ID_DES");
    }
    setSearchParams(searchParams);
  };

  const sortByTime = () => {
    switch (sort) {
      case "TIME_DES":
        searchParams.set(orderApiQueryKey.SORT, "TIME_ASC");
        break;
      case "TIME_ASC":
        searchParams.delete(orderApiQueryKey.SORT);
        break;
      default:
        searchParams.set(orderApiQueryKey.SORT, "TIME_DES");
    }
    setSearchParams(searchParams);
  };

  const filterByStatus = () => {
    switch (status) {
      case "FALSE":
        searchParams.set(orderApiQueryKey.STATUS, "TRUE");
        searchParams.delete(orderApiQueryKey.PAGE);
        break;
      case "TRUE":
        searchParams.delete(orderApiQueryKey.STATUS);
        break;
      default:
        searchParams.set(orderApiQueryKey.STATUS, "FALSE");
        searchParams.delete(orderApiQueryKey.PAGE);
    }
    setSearchParams(searchParams);
  };

  const filterBySearch = (search: string) => {
    searchParams.set(orderApiQueryKey.SEARCH, search);
    searchParams.delete(orderApiQueryKey.PAGE);
    setSearchParams(searchParams);
  };

  return { sortById, sortByTime, filterByStatus, filterBySearch };
};

export const useQueryOrderTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get(orderApiQueryKey.PAGE);
  const date = searchParams.get(orderApiQueryKey.DATE);
  const sort = searchParams.get(orderApiQueryKey.SORT) as SortType;
  const status = searchParams.get(orderApiQueryKey.STATUS) as StatusType;
  const search = searchParams.get(orderApiQueryKey.SEARCH);

  const { data, isSuccess } = useQuery(
    ["order", page, date, sort, status, search],
    () =>
      fetchGetOrderList({
        page,
        date,
        sort,
        status,
        search,
      }),
    {
      select: (res) => {
        const totalCount = res.headers["x-total-count"];
        const orderList = res.data;
        return { totalCount, orderList };
      },
      staleTime: 5000,
    }
  );

  if (isSuccess && !data) throw new Error("success query but no data");
  const { totalCount, orderList } = data!;

  return { totalCount, orderList, isSuccess };
};
