import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TableBody from "../components/table/TableBody";
import TableHead from "../components/table/TableHead";
import TableSearchForm from "../components/table/TableSearchForm";
import PaginatedContainer from "../components/table/PaginatedContainer";
import StatusButtonContainer from "../components/table/StatusButtonContainer";
import { filterData } from "../utils/filterData";
import { orderHandler } from "../utils/orderHandler";
import { getCustomers } from "../api/customer-api";
import { CustomerType } from "../types/customer.types";
import classes from "./TablePage.module.css";

const TablePage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
    select: (value) =>
      (value as CustomerType[]).filter((item) =>
        item.transaction_time.includes("2023-03-08"),
      ),
    refetchInterval: 1000 * 5,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get("id");
  const queryTime = searchParams.get("transaction_time");
  const querySearch = searchParams.get("search");
  const queryStatus = searchParams.get("status");
  const queryPage = searchParams.get("page");
  const limit = 50;
  const offset = ((Number(queryPage) || 1) - 1) * limit;

  const getFilteredData = useMemo(
    () =>
      filterData(
        data as CustomerType[],
        queryId as string,
        queryTime as string,
        querySearch as string,
        queryStatus as string,
      ),
    [data, queryId, queryTime, querySearch, queryStatus],
  );

  const allPages =
    data && Math.ceil((getFilteredData as CustomerType[]).length / limit);

  const sortOrderHandler = (e: React.BaseSyntheticEvent) =>
    orderHandler(
      queryId as string,
      queryTime as string,
      searchParams,
      setSearchParams,
      e,
    );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [queryPage]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{JSON.stringify((error as Error).message)}</p>;

  return (
    <main>
      <div className={classes.sort_wrapper}>
        <TableSearchForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <StatusButtonContainer
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      <table className={classes.table}>
        <TableHead onClick={sortOrderHandler} />
        <TableBody
          data={getFilteredData as CustomerType[]}
          offset={offset}
          limit={limit}
        />
      </table>
      <PaginatedContainer
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        allPages={allPages as number}
      />
    </main>
  );
};

export default TablePage;
