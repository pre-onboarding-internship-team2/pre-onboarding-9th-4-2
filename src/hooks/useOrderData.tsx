import { useState } from "react";
import { useQuery } from "react-query";
import { getOrderListData, TODAY } from "../api/getOrderListData";
import useQueryString from "./useQueryString";

function useOrderDataQuery() {
  const displayItemAmountPerPage = 50;

  const { page, sortBy, sortOrder, setQueryParams } = useQueryString();

  const currentPage = page || 1;

  const onPageChange = (newPage: number) => {
    setQueryParams({ page: newPage });
  };

  // TODO : context로 분리하면 좋겠다
  const [paginationData, setPaginationData] = useState({
    minPage: 1,
    maxPage: 1,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const { data, isLoading } = useQuery(
    [
      "orderData",
      {
        page: currentPage,
        date: TODAY,
        itemAmountPerPage: displayItemAmountPerPage,
        sortBy,
        sortOrder,
      },
    ],
    () =>
      getOrderListData({
        page: currentPage,
        sortBy,
        sortOrder,
      }),
    {
      keepPreviousData: true,
      onSuccess: ({ minPage, maxPage, hasNextPage, hasPrevPage }) => {
        setPaginationData({
          minPage,
          maxPage,
          hasNextPage,
          hasPrevPage,
        });
      },
    }
  );

  return {
    orderData: data?.data || [],
    isLoading,
    paginationData,
    currentPage,
    onPageChange,
  };
}

export default useOrderDataQuery;
