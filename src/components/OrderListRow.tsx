import type { OrderData } from "../types/OrderData";
import type { OrderListTableProps } from "./OrderListTable";

export interface OrderListRowProps {
  rowData: OrderData;
  headerColumns: OrderListTableProps["headerColumns"]; // headerColumns 에 입력된 key 순서대로 td 표시하기 위해 props로 내려받음
}

export function OrderListRow({ headerColumns, rowData }: OrderListRowProps) {
  return (
    <tr>
      {headerColumns.map(({ field, renderRowDataColumn }) => {
        return (
          <td key={field}>
            {renderRowDataColumn
              ? renderRowDataColumn(rowData)
              : rowData[field]}
          </td>
        );
      })}
    </tr>
  );
}
