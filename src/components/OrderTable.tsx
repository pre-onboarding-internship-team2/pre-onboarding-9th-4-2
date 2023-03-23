import PaginationButtons from "./OrderTable.PaginationButtons";
import Table from "./common/Table";
import SearchForm from "./OrderTable.SearchForm";
import { useOrderTableFunctions, useQueryOrderTable } from "./OrderTable.hooks";

export default function OrderTable() {
  const { sortById, sortByTime, filterByStatus } = useOrderTableFunctions();
  const { data, isLoading, isSuccess } = useQueryOrderTable();

  const headerRows = [
    {
      title: "주문번호",
      callback: sortById,
    },
    {
      title: "거래시간",
      callback: sortByTime,
    },
    {
      title: "주문처리상태",
      callback: filterByStatus,
    },
    { title: "고객번호" },
    { title: "고객이름" },
    { title: "가격" },
  ];

  const bodyRows = !isSuccess
    ? []
    : data.orderList.map((row) => ({
        ...row,
        status: row.status ? "완료" : "처리필요",
        key: row.id.toString(),
      }));

  return (
    <>
      <SearchForm />
      <Table
        headerRows={headerRows}
        bodyRows={bodyRows}
        isLoading={isLoading}
      />
      <PaginationButtons totalCount={data?.totalCount ?? 0} />
    </>
  );
}
