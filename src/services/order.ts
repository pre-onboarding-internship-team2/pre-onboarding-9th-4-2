import axios from "axios";

export type OrderProps = {
  id: number;
  transaction_time: string; // yyyy-mm-dd hh:mm:ss
  status: boolean; // 주문처리 완료시 true
  customer_id: number;
  customer_name: string;
  currency: string; // ex) $20.42
};

export type SortType = "ID_DES" | "ID_ASC" | "TIME_DES" | "TIME_ASC";

export type StatusType = "TRUE" | "FALSE";

export const orderApiUrls = {
  ORDER: "/api/order",
};

export const orderApiQueryKey = {
  PAGE: "page",
  DATE: "date",
  SORT: "sort",
  STATUS: "status",
};

// 과제 요구사항에 따른 페이지당 데이터 개수
export const PAGINATION_PER_PAGE = 50;

// 과제 요구사항에 따른 "오늘"
export const TODAY = "2023-03-08";

export const fetchGetOrderList = ({
  page,
  date,
  sort,
  status,
}: {
  page: string | null;
  date: string | null;
  sort: SortType | null;
  status: StatusType | null;
}) => {
  return axios.get<OrderProps[]>(
    `${orderApiUrls.ORDER}?${orderApiQueryKey.PAGE}=${page ?? "1"}&${
      orderApiQueryKey.DATE
    }=${date ?? TODAY}&${orderApiQueryKey.SORT}=${sort}&${
      orderApiQueryKey.STATUS
    }=${status}`
  );
};
