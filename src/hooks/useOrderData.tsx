import { useQuery, UseQueryOptions } from "react-query";
import {
  getOrderListData,
  GetOrderListDataRes,
  TODAY,
} from "../api/getOrderListData";
import useQueryString from "./useQueryString";

function useOrderDataQuery({
  onSuccess,
}: Pick<UseQueryOptions<GetOrderListDataRes>, "onSuccess">) {
  const displayItemAmountPerPage = 50;

  const { page, sortBy, sortOrder } = useQueryString();

  const currentPage = page || 1;

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
      onSuccess,
    }
  );

  return {
    orderData: data?.data || [],
    isLoading,
  };
}

export default useOrderDataQuery;
