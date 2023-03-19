import axios from "axios";

export type OrderProps = {
  id: number;
  transaction_time: string; // yyyy-mm-dd hh:mm:ss
  status: boolean; // 주문처리 완료시 true
  customer_id: number;
  customer_name: string;
  currency: string; // ex) $20.42
};

type GetOrderListResponse = OrderProps[];

export const orderApiUrls = {
  ORDER: "/api/order",
};

export const fetchGetOrderList = async () => {
  return (await axios.get<GetOrderListResponse>(orderApiUrls.ORDER)).data;
};
