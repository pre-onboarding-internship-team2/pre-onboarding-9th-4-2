import { useQuery, UseQueryOptions } from "react-query";
import {
  getOrderListData,
  GetOrderListDataRes,
  TODAY,
} from "../../api/getOrderListData";
import useQueryString from "../useQueryString";

const REFETCH_INTERVAL = 5000;

function useOrderDataQuery({
  onSuccess,
}: Pick<UseQueryOptions<GetOrderListDataRes>, "onSuccess">) {
  const displayItemAmountPerPage = 50;

  const { params } = useQueryString();

  const currentPage = params.page || 1;

  const { data, status, isFetching } = useQuery(
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
      refetchInterval: REFETCH_INTERVAL,
      onSuccess,
    }
  );

  return {
    orderData: data?.data || [],
    status,
    isFetching,
  };
}

export default useOrderDataQuery;
