import { OrderListQueryParams } from "../hooks/useQueryString";
import type { OrderData } from "../types/OrderData";
import { formatDate } from "../utils/formatDate";

export interface GetOrderListDataProps extends OrderListQueryParams {
  date?: string;
  itemAmountPerPage?: number;
}

interface GetOrderListDataRes {
  data: OrderData[];
  minPage: number;
  maxPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export const TODAY = "2023-03-08";

export const getOrderListData = async ({
  date = TODAY,
  itemAmountPerPage = 50,
  page = 1,
  sortBy,
  sortOrder,
}: GetOrderListDataProps): Promise<GetOrderListDataRes> => {
  const res = await fetch("/mock_data.json");
  if (!res.ok) throw new Error("데이터를 불러오지 못했습니다");
  let data: OrderData[] = await res.json();

  data = data.filter((item) => formatDate(item.transaction_time) === date);

  if (sortBy && sortOrder) {
    data.sort((a, b) => {
      const [first, second] = sortOrder === "asc" ? [a, b] : [b, a];
      return first[sortBy] > second[sortBy] ? 1 : -1;
    });
  }

  const minPage = 1;
  const maxPage = Math.ceil(data.length / itemAmountPerPage) || 1;

  const result = {
    data: data.slice((page - 1) * itemAmountPerPage, page * itemAmountPerPage),
    minPage,
    maxPage,
    hasPrevPage: page > minPage,
    hasNextPage: page < maxPage,
  };

  return result;
};
