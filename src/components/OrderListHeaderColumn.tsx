import { AiOutlineArrowDown } from "react-icons/ai";
import useQueryString from "../hooks/useQueryString";
import type { OrderData } from "../types/OrderData";
import type { OrderDataKey, SortOrder } from "../types/QueryParams";

export interface HeaderColumn<T extends OrderData = OrderData> {
  field: keyof T;
  label: string;
  renderHeaderColumn?: (headerColumn: HeaderColumn) => JSX.Element;
  renderRowDataColumn?: (rowData: T) => React.ReactNode;
  sortable?: boolean;
}

export function OrderListHeaderColumn(props: HeaderColumn) {
  const { label, renderHeaderColumn, sortable } = props;

  if (sortable) {
    return <SortableOrderListHeaderColumn {...props} />;
  }

  return (
    <th className="order-list-table__header-column">
      {renderHeaderColumn ? renderHeaderColumn(props) : label}
    </th>
  );
}

function SortableOrderListHeaderColumn(props: HeaderColumn) {
  const { label, renderHeaderColumn, field } = props;
  const {
    params: { sortBy, sortOrder },
    setQueryParams,
    deleteQueryParams,
  } = useQueryString();

  const isSortedByCurrentFieldInDescOrder =
    sortBy === field && sortOrder === "desc";

  function changeSort({
    sortBy,
    sortOrder,
  }: {
    sortBy: OrderDataKey;
    sortOrder: SortOrder;
  }) {
    setQueryParams({ sortBy, sortOrder });
  }

  function resetSort() {
    deleteQueryParams(["sortBy", "sortOrder"]);
  }

  const applySort = () => {
    if (isSortedByCurrentFieldInDescOrder) resetSort();
    else changeSort({ sortBy: field, sortOrder: "desc" });
  };

  return (
    <th
      className="order-list-table__header-column--sortable"
      onClick={applySort}
    >
      {renderHeaderColumn ? renderHeaderColumn(props) : label}
      {isSortedByCurrentFieldInDescOrder && <AiOutlineArrowDown />}
    </th>
  );
}
