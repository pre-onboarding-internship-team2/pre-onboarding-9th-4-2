import { useState } from "react";
import { getOrderListData } from "../api/getOrderListData";
import type { OrderData } from "../types/OrderData";

function useOrderData() {
  const [orderData, setOrderData] = useState<OrderData[]>([]);

  // TODO : context로 분리하면 좋겠다
  const [paginationData, setPaginationData] = useState({
    minPage: 1,
    maxPage: 1,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const displayItemAmountPerPage = 50;

  const loadOrderData = async ({ page }: { page: number }) => {
    const TODAY = "2023-03-08";
    const { data, minPage, maxPage, hasPrevPage, hasNextPage } =
      await getOrderListData({
        date: TODAY,
        itemAmountPerPage: displayItemAmountPerPage,
        page,
      });
    setOrderData(data);
    setPaginationData({
      minPage,
      maxPage,
      hasNextPage,
      hasPrevPage,
    });
  };

  return {
    loadOrderData,
    orderData,
    paginationData,
  };
}

export default useOrderData;
