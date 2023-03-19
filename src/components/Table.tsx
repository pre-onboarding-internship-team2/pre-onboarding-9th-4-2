import { useEffect, useState } from "react";
import { CustomerType } from "../types/customer.types";
import PaginatedContainer from "./PaginatedContainer";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSearchParams } from "react-router-dom";

export interface TableProps {
  data: CustomerType[];
}

const Table = ({ data }: TableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const limit = 50;
  const offset = (page - 1) * limit;
  const allPages = data && Math.ceil(data.length / limit);

  const getFilteredData = () => {
    const queryId = searchParams.get("id");
    const queryTime = searchParams.get("transaction_time");
    if (!queryId && !queryTime) {
      return data;
    }

    if (queryId && !queryTime) {
      return data?.sort((a, b) => b.id - a.id);
    }

    if (!queryId && queryTime) {
      return data?.sort((a, b) =>
        a.transaction_time.localeCompare(b.transaction_time),
      );
    }
  };

  const orderHandler = (e: any) => {
    if (e.target.abbr === "id") {
      if (searchParams.get("id")) {
        setSearchParams({});
      } else {
        setSearchParams({ id: "desc" });
      }
    }

    if (e.target.abbr === "transaction_time") {
      if (searchParams.get("transaction_time")) {
        setSearchParams({});
      } else {
        setSearchParams({ transaction_time: "desc" });
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <main>
      <table>
        <TableHead onClick={orderHandler} />
        <TableBody
          data={getFilteredData() as CustomerType[]}
          offset={offset}
          limit={limit}
        />
      </table>
      <PaginatedContainer page={page} setPage={setPage} allPages={allPages} />
    </main>
  );
};

export default Table;
