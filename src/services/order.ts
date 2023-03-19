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
  SEARCH: "search",
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
  search,
}: {
  page: string | null;
  date: string | null;
  sort: SortType | null;
  status: StatusType | null;
  search: string | null;
}) => {
  const concatQuery = () => {
    let query = "?";
    if (page) query = query.concat(`${orderApiQueryKey.PAGE}=${page}&`);
    else query = query.concat(`${orderApiQueryKey.PAGE}=1&`);
    if (date) query = query.concat(`${orderApiQueryKey.DATE}=${date}&`);
    else query = query.concat(`${orderApiQueryKey.DATE}=${TODAY}&`);
    if (sort) query = query.concat(`${orderApiQueryKey.SORT}=${sort}&`);
    if (status) query = query.concat(`${orderApiQueryKey.STATUS}=${status}&`);
    if (search) query = query.concat(`${orderApiQueryKey.SEARCH}=${search}&`);

    return query.slice(0, -1);
  };

  return axios.get<OrderProps[]>(`${orderApiUrls.ORDER}${concatQuery()}`);
};
