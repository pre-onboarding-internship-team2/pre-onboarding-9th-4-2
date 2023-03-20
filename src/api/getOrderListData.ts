import type { OrderData } from "../types/OrderData";
import { formatDate } from "../utils/formatDate";

interface GetOrderListDataProps {
  date: string;
  itemAmountPerPage: number;
  page: number;
}

interface GetOrderListDataRes {
  data: OrderData[];
  minPage: number;
  maxPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
export const getOrderListData = async ({
  date,
  itemAmountPerPage = 50,
  page,
}: GetOrderListDataProps): Promise<GetOrderListDataRes> => {
  const res = await fetch("/mock_data.json");
  if (!res.ok) throw new Error("데이터를 불러오지 못했습니다");
  const data: OrderData[] = await res.json();

  const filteredData = data.filter(
    (item) => formatDate(item.transaction_time) === date
  );

  const minPage = 1;
  const maxPage = Math.ceil(filteredData.length / itemAmountPerPage) || 1;

  const result = {
    data: filteredData.slice(
      (page - 1) * itemAmountPerPage,
      page * itemAmountPerPage
    ),
    minPage,
    maxPage,
    hasPrevPage: page > minPage,
    hasNextPage: page < maxPage,
  };

  return result;
};
