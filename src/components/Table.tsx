import { useEffect } from "react";
import { CustomerType } from "../types/customer.types";
import PaginatedContainer from "./PaginatedContainer";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSearchParams } from "react-router-dom";
import TableSearchForm from "./TableSearchForm";

export interface TableProps {
  data: CustomerType[];
}

const Table = ({ data }: TableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page");
  const limit = 50;
  const offset = ((Number(queryPage) || 1) - 1) * limit;

  const getFilteredData = () => {
    const queryId = searchParams.get("id");
    const queryTime = searchParams.get("transaction_time");
    const querySearch = searchParams.get("search");
    const queryStatus = searchParams.get("status");

    const filteredData = data
      ?.sort((a, b): any => {
        if (queryId) {
          return b.id - a.id;
        } else {
          return a.id - b.id;
        }
      })
      .sort((a, b): any => {
        if (queryTime) {
          return b.transaction_time.localeCompare(a.transaction_time);
        } else {
          return data;
        }
      })
      .filter((item) => {
        if (querySearch) {
          return item.customer_name
            .toLowerCase()
            .includes(querySearch.toLowerCase());
        } else {
          return data;
        }
      })
      // eslint-disable-next-line array-callback-return
      .filter((item) => {
        if (queryStatus === "true") {
          return item.status === true;
        } else if (queryStatus === "false") {
          return item.status === false;
        } else {
          return data;
        }
      });
    return filteredData;
  };

  const allPages = data && Math.ceil(getFilteredData().length / limit);

  const orderHandler = (e: any) => {
    if (e.target.abbr === "id") {
      if (searchParams.get("id")) {
        searchParams.delete("id");
        setSearchParams(searchParams);
      } else {
        searchParams.append("id", "desc");
        searchParams.delete("transaction_time");
        setSearchParams(searchParams);
      }
    }

    if (e.target.abbr === "transaction_time") {
      if (searchParams.get("transaction_time")) {
        searchParams.delete("transaction_time");
        setSearchParams(searchParams);
      } else {
        searchParams.append("transaction_time", "desc");
        searchParams.delete("id");
        setSearchParams(searchParams);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [queryPage]);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    if (name === "status__true") {
      searchParams.set("status", "true");
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    } else if (name === "status__false") {
      searchParams.set("status", "false");
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    } else if (name === "status__reset") {
      searchParams.delete("status");
      setSearchParams(searchParams);
    }
  };

  console.log("rendering");

  return (
    <main>
      <TableSearchForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <button name="status__true" onClick={onClick}>
        status true
      </button>
      <button name="status__false" onClick={onClick}>
        status false
      </button>
      <button name="status__reset" onClick={onClick}>
        status reset
      </button>
      <table>
        <TableHead onClick={orderHandler} />
        <TableBody
          data={getFilteredData() as CustomerType[]}
          offset={offset}
          limit={limit}
        />
      </table>
      <PaginatedContainer
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        allPages={allPages}
      />
    </main>
  );
};

export default Table;
