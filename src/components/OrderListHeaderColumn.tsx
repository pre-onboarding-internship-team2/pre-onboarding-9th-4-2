import type { OrderData } from "../types/OrderData";

export interface HeaderColumn<T extends OrderData = OrderData> {
  key: keyof T;
  label: string;
  renderHeaderColumn?: (headerColumn: HeaderColumn) => JSX.Element;
  renderRowDataColumn?: (rowData: T) => React.ReactNode;
}

export function OrderListHeaderColumn(props: HeaderColumn) {
  const { label, renderHeaderColumn } = props;

  return (
    <th className="order-list-table__header-column">
      {renderHeaderColumn ? renderHeaderColumn(props) : label}
    </th>
  );
}
