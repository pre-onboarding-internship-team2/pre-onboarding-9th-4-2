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

  const { params } = useQueryString();

  const currentPage = params.page || 1;

  const { data, isLoading } = useQuery(
    [
      "orderData",
      {
        ...params,
        page: currentPage,
        date: TODAY,
        itemAmountPerPage: displayItemAmountPerPage,
      },
    ],
    () =>
      getOrderListData({
        ...params,
        page: currentPage,
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
