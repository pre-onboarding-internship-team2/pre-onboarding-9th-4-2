import "./App.style.css";
import type { HeaderColumn } from "./components/OrderListHeaderColumn";
import OrderListTable from "./components/OrderListTable";
import Pagination from "./components/Pagination";
import useOrderDataQuery from "./hooks/useOrderData";

function App() {
  const { isLoading, orderData, paginationData, currentPage, onPageChange } =
    useOrderDataQuery();
  const headerColumns: HeaderColumn[] = [
    { field: "id", label: "주문번호", sortable: true },
    { field: "transaction_time", label: "거래시간", sortable: true },
    {
      field: "status",
      label: "주문처리상태",
      renderRowDataColumn: (rowData) => rowData["status"].toString(),
    },
    { field: "customer_id", label: "고객번호" },
    { field: "customer_name", label: "고객이름" },
    { field: "currency", label: "가격" },
  ];

  return (
    <div className="App">
      <OrderListTable
        headerColumns={headerColumns}
        data={orderData}
        isLoading={isLoading}
        pagination={
          <Pagination
            {...paginationData}
            currentPage={currentPage}
            onPageChange={onPageChange}
            span={headerColumns.length}
          />
        }
      />
    </div>
  );
}

export default App;
