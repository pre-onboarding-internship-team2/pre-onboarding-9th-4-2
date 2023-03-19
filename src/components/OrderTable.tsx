import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  fetchGetOrderList,
  orderApiQueryKey,
  SortType,
  StatusType,
} from "../services/order";
import PaginationButtons from "./OrderTable.PaginationButtons";
import Table from "./common/Table";

export default function OrderTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get(orderApiQueryKey.PAGE);
  const date = searchParams.get(orderApiQueryKey.DATE);
  const sort = searchParams.get(orderApiQueryKey.SORT) as SortType;
  const status = searchParams.get(orderApiQueryKey.STATUS) as StatusType;
  const search = searchParams.get(orderApiQueryKey.SEARCH);

  const { data, isSuccess } = useQuery(
    ["order", page, date, sort, status, search],
    () =>
      fetchGetOrderList({
        page,
        date,
        sort,
        status,
        search,
      }),
    {
      select: (res) => {
        const totalCount = res.headers["x-total-count"];
        const orderList = res.data;
        return { totalCount, orderList };
      },
      staleTime: 5000,
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
        switch (sort) {
          case "ID_DES":
            searchParams.set(orderApiQueryKey.SORT, "ID_ASC");
            break;
          case "ID_ASC":
            searchParams.delete(orderApiQueryKey.SORT);
            break;
          default:
            searchParams.set(orderApiQueryKey.SORT, "ID_DES");
        }
        setSearchParams(searchParams);
      },
    },
    {
      title: "거래시간",
      callback: () => {
        switch (sort) {
          case "TIME_DES":
            searchParams.set(orderApiQueryKey.SORT, "TIME_ASC");
            break;
          case "TIME_ASC":
            searchParams.delete(orderApiQueryKey.SORT);
            break;
          default:
            searchParams.set(orderApiQueryKey.SORT, "TIME_DES");
        }
        setSearchParams(searchParams);
      },
    },
    {
      title: "주문처리상태",
      callback: () => {
        switch (status) {
          case "FALSE":
            searchParams.set(orderApiQueryKey.STATUS, "TRUE");
            searchParams.delete(orderApiQueryKey.PAGE);
            break;
          case "TRUE":
            searchParams.delete(orderApiQueryKey.STATUS);
            break;
          default:
            searchParams.set(orderApiQueryKey.STATUS, "FALSE");
            searchParams.delete(orderApiQueryKey.PAGE);
        }
        setSearchParams(searchParams);
      },
    },
    { title: "고객번호" },
    { title: "고객이름" },
    { title: "가격" },
  ];

  return (
    <>
      {isSuccess ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formElement = e.target as HTMLFormElement;
              const inputElement = formElement[0] as HTMLInputElement;
              const { value } = inputElement;
              searchParams.set(orderApiQueryKey.SEARCH, value);
              searchParams.delete(orderApiQueryKey.PAGE);
              setSearchParams(searchParams);
            }}
          >
            <label>
              고객이름 검색
              <input />
            </label>
            <button type="submit">검색</button>
          </form>
          <Table headerRows={headerRows} bodyRows={bodyRows} />
          <PaginationButtons totalCount={totalCount} />
        </>
      ) : (
        "fail"
      )}
    </>
  );
}
