import { useState } from "react";
import { GetOrderListDataRes } from "../api/getOrderListData";
import useQueryString from "./useQueryString";

function usePagination() {
  const {
    params: { page },
    setQueryParams,
  } = useQueryString();
  const currentPage = page || 1;

  const onPageChange = (newPage: number) => {
    setQueryParams({ page: newPage });
  };

  const [paginationData, setPaginationData] = useState({
    minPage: 1,
    maxPage: 1,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const updatePaginationData = ({
    minPage,
    maxPage,
    hasNextPage,
    hasPrevPage,
  }: GetOrderListDataRes) => {
    setPaginationData({
      minPage,
      maxPage,
      hasNextPage,
      hasPrevPage,
    });
  };

  return {
    paginationData,
    currentPage,
    onPageChange,
    updatePaginationData,
  };
}

export default usePagination;
