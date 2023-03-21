import { useSearchParams } from "react-router-dom";
import type { OrderData } from "../types/OrderData";

export interface HeaderColumn<T extends OrderData = OrderData> {
  field: keyof T;
  label: string;
  renderHeaderColumn?: (headerColumn: HeaderColumn) => JSX.Element;
  renderRowDataColumn?: (rowData: T) => React.ReactNode;
  sortable?: boolean;
}

export function OrderListHeaderColumn(props: HeaderColumn) {
  const { label, renderHeaderColumn, sortable, field } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");

  function changeSortField() {
    searchParams.set("sortBy", field);
    searchParams.set("sortOrder", "desc");
    setSearchParams(searchParams);
  }

  function resetSort() {
    searchParams.delete("sortOrder");
    searchParams.delete("sortBy");
    setSearchParams(searchParams);
  }

  const applySort = () => {
    if (!sortBy || !sortOrder || sortBy !== field) {
      changeSortField();
      return;
    }
    resetSort();
  };

  return (
    <th
      className="order-list-table__header-column"
      style={{ cursor: sortable ? "pointer" : undefined }}
      onClick={applySort}
    >
      {renderHeaderColumn ? renderHeaderColumn(props) : label}
      {sortable && sortBy === field && sortOrder === "desc" && (
        // TODO 아이콘으로 바꾸기
        <span>내림</span>
      )}
    </th>
  );
}

// // TODO 타입 정리하기 - GetOrderListDataProps 에도 sortOrder 있음
// type Order = "desc" | "asc" | "reset";
// const orders: Order[] = ["desc", "asc"];

// const orderLabel: Record<Order, string> = {
//   desc: "내림",
//   asc: "오름",
//   reset: "초기화",
// };

// function HeaderSortDisplay({ field }: Pick<HeaderColumn, "field">) {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const sortBy = searchParams.get("sortBy");
//   const sortOrder = searchParams.get("sortOrder");

//   const sort = (order: Order) => {
//     if (order === "reset") {
//       searchParams.delete("sortBy");
//       searchParams.delete("sortOrder");
//       setSearchParams(searchParams);
//       return;
//     }

//     searchParams.set("sortBy", field);
//     searchParams.set("sortOrder", order);
//     setSearchParams(searchParams);
//   };

//   return (
//     // TODO 인라인 스타일 제거
//     // FIXME 버튼 누를때마다 칸 너비가 달라짐 - tr마다 너비 지정 필요할듯
//     <span style={{ display: "inline-flex", marginLeft: "10px" }}>
//       {orders.map((order) => {
//         return (
//           <Fragment key={order}>
//             {sortBy === field && sortOrder === order ? (
//               <span style={{ order: 1 }}>{orderLabel[order]}</span>
//             ) : (
//               <button onClick={() => sort(order)} style={{ order: 2 }}>
//                 {orderLabel[order]}
//               </button>
//             )}
//           </Fragment>
//         );
//       })}
//       {sortBy === field && sortOrder && (
//         <button onClick={() => sort("reset")} style={{ order: 2 }}>
//           {orderLabel.reset}
//         </button>
//       )}
//     </span>
//   );
// }
