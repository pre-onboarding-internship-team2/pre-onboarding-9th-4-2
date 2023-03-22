import type { OrderData } from "../types/OrderData";
import { OrderListQueryParams } from "../types/QueryParams";
import { OrderDataProcessor } from "../utils/orderDataProcessor";

export interface GetOrderListDataRes {
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
  customerName,
  orderStatus,
}: OrderListQueryParams): Promise<GetOrderListDataRes> => {
  const res = await fetch("/mock_data.json");
  if (!res.ok) throw new Error("데이터를 불러오지 못했습니다");

  let data: OrderData[] = await res.json();

  const processor = new OrderDataProcessor(data);
  // filter -> sort -> pagination 순으로 실행해야 올바른 결과가 나옴
  const processResult = processor
    .applyFilter({ date, orderStatus, customerName })
    .applySort({ sortBy, sortOrder })
    .applyPagination({ page, itemAmountPerPage })
    .getProcessedResult();

  const minPage = 1;
  const maxPage = processResult.maxPage || 1;

  return {
    data: processResult.data,
    minPage,
    maxPage,
    hasPrevPage: page > minPage,
    hasNextPage: page < maxPage,
  };
};
