import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchGetOrderList, orderApiQueryKey } from "../services/order";
import PaginationButtons from "./OrderTable.PaginationButtons";
import Table from "./common/Table";

export default function OrderTable() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get(orderApiQueryKey.PAGE);
  const date = searchParams.get(orderApiQueryKey.DATE);
  const { data, isSuccess } = useQuery(
    ["order", page],
    () => fetchGetOrderList({ page, date }),
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
    "주문번호",
    "거래시간",
    "주문처리상태",
    "고객번호",
    "고객이름",
    "가격",
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
