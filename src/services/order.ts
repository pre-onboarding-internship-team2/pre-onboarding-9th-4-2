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

export const orderApiQueryKey = {
  PAGE: "page",
};

export const PAGINATION_PER_PAGE = 50;

export const fetchGetOrderList = (page: string) => {
  return axios.get<GetOrderListResponse>(
    `${orderApiUrls.ORDER}?${orderApiQueryKey.PAGE}=${page}`
  );
};
