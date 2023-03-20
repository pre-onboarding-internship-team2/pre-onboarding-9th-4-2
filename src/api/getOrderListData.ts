import type { OrderData } from "../types/OrderData";

export const getOrderListData = async (): Promise<OrderData[]> => {
  const res = await fetch("/mock_data.json");
  if (!res.ok) throw new Error("데이터를 불러오지 못했습니다");
  const data = await res.json();
  return data;
};
