import type { OrderData } from "../types/OrderData";

export interface HeaderColumn<T extends OrderData = OrderData> {
  key: keyof T;
  label: string;
  renderHeaderColumn?: (headerColumn: HeaderColumn) => JSX.Element;
}

export function OrderListHeaderColumn(props: HeaderColumn) {
  const { label, renderHeaderColumn } = props;

  if (renderHeaderColumn) return renderHeaderColumn(props);
  return <th>{label}</th>;
}
