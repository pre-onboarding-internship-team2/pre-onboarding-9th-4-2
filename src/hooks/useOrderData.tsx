import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getOrderListData, TODAY } from "../api/getOrderListData";

function useOrderData() {
  const displayItemAmountPerPage = 50;

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromQueryString = searchParams.get("page");
  const currentPage = pageFromQueryString ? Number(pageFromQueryString) : 1;

  const onPageChange = (newPage: number) => {
    setSearchParams((prev) => ({ ...prev, page: newPage }));
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
      },
    ],
    () =>
      getOrderListData({
        page: currentPage,
      }),
    {
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

export default useOrderData;
