import React from "react";
import type { OrderData } from "../types/OrderData";
import type { HeaderColumn } from "./OrderListHeaderColumn";
import { OrderListHeaderColumn } from "./OrderListHeaderColumn";
import { OrderListRow } from "./OrderListRow";

export interface OrderListTableProps<T extends OrderData = OrderData> {
  headerColumns: HeaderColumn<T>[];
  data: T[];
  isLoading?: boolean;
  pagination: React.ReactNode;
}

function OrderListTable({
  headerColumns,
  pagination,
  data,
  isLoading,
}: OrderListTableProps) {
  return (
    <table className="order-list-table">
      <thead>
        <tr>
          {headerColumns.map((headerColumn) => (
            <OrderListHeaderColumn {...headerColumn} />
          ))}
        </tr>
      </thead>

      <tfoot>{pagination}</tfoot>

      <tbody>
        {isLoading && <LoadingIndicator />}
        {data.map((rowData) => (
          <OrderListRow
            key={rowData.id}
            rowData={rowData}
            headerColumns={headerColumns}
          ></OrderListRow>
        ))}
      </tbody>
    </table>
  );
}

export default OrderListTable;

function LoadingIndicator() {
  return (
    <tr>
      <td>loading...</td>
    </tr>
  );
}
