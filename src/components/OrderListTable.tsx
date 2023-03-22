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
            <OrderListHeaderColumn key={headerColumn.field} {...headerColumn} />
          ))}
        </tr>
      </thead>

      <tfoot>{pagination}</tfoot>

      {/*  TODO 스타일 수정.. */}
      <tbody
        style={{
          display: "block",
          height: "700px",
          overflow: "auto",
          position: "relative",
        }}
      >
        {isLoading ? (
          <LoadingIndicator />
        ) : !data.length ? (
          <NoDataText />
        ) : (
          data.map((rowData) => (
            <OrderListRow
              key={rowData.id}
              rowData={rowData}
              headerColumns={headerColumns}
            ></OrderListRow>
          ))
        )}
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

function NoDataText() {
  return (
    <tr>
      <td>데이터가 없습니다</td>
    </tr>
  );
}
