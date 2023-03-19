import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  fetchGetOrderList,
  orderApiQueryKey,
  SortType,
} from "../services/order";
import PaginationButtons from "./OrderTable.PaginationButtons";
import Table from "./common/Table";

export default function OrderTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get(orderApiQueryKey.PAGE);
  const date = searchParams.get(orderApiQueryKey.DATE);
  const sort = searchParams.get(orderApiQueryKey.SORT) as SortType;

  const { data, isSuccess } = useQuery(
    ["order", page, date, sort],
    () => fetchGetOrderList({ page, date, sort }),
    {
      select: (res) => {
        const totalCount = res.headers["x-total-count"];
        const orderList = res.data;
        return { totalCount, orderList };
      },
    }
  );

  if (isSuccess && !data) throw new Error("success query but no data");
  const { totalCount, orderList } = data!;

  const bodyRows = orderList.map((row) => ({
    ...row,
    status: row.status ? "완료" : "처리필요",
    key: row.id.toString(),
  }));

  const headerRows = [
    {
      title: "주문번호",
      callback: () => {
        searchParams.set(orderApiQueryKey.SORT, "id");
        setSearchParams(searchParams);
      },
    },
    {
      title: "거래시간",
      callback: () => {
        searchParams.set(orderApiQueryKey.SORT, "time");
        setSearchParams(searchParams);
      },
    },
    { title: "주문처리상태" },
    { title: "고객번호" },
    { title: "고객이름" },
    { title: "가격" },
  ];

  return (
    <>
      {isSuccess ? (
        <>
          <Table headerRows={headerRows} bodyRows={bodyRows} />
          <PaginationButtons totalCount={totalCount} />
        </>
      ) : (
        "fail"
      )}
    </>
  );
}
