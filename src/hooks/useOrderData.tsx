import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import {
  getOrderListData,
  GetOrderListDataProps,
  TODAY,
} from "../api/getOrderListData";

function useOrderData() {
  const displayItemAmountPerPage = 50;

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromQueryString = searchParams.get("page");
  const currentPage = pageFromQueryString ? Number(pageFromQueryString) : 1;
  // TODO ; sortBy, sortOrder searchParams에서 가져오고 저장하는 훅 만들기. HeaderSortDisplay에서도 사용함
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");

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
        sortBy,
        sortOrder,
      },
    ],
    () =>
      getOrderListData({
        page: currentPage,
        sortBy: sortBy
          ? (sortBy as GetOrderListDataProps["sortBy"])
          : undefined,
        sortOrder: sortOrder
          ? (sortOrder as GetOrderListDataProps["sortOrder"])
          : undefined,
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
