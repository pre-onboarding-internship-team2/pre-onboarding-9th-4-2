import { useQuery } from "@tanstack/react-query";
import { fetchGetOrderList } from "../services/order";

export default function OrderTable() {
  const { data: orderList, isSuccess } = useQuery(["order"], fetchGetOrderList);

  return (
    <>{isSuccess ? orderList.map((order) => order.customer_name) : "fail"}</>
  );
}
