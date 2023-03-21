import { useEffect } from "react";
import "./App.style.css";
import type { HeaderColumn } from "./components/OrderListHeaderColumn";
import OrderListTable from "./components/OrderListTable";
import Pagination from "./components/Pagination";
import useOrderData from "./hooks/useOrderData";

function App() {
  const { loadOrderData, orderData, paginationData } = useOrderData();
  const headerColumns: HeaderColumn[] = [
    { key: "id", label: "주문번호" },
    { key: "transaction_time", label: "거래시간" },
    {
      key: "status",
      label: "주문처리상태",
      renderRowDataColumn(rowData) {
        return rowData["status"].toString();
      },
    },
    { key: "customer_id", label: "고객번호" },
    { key: "customer_name", label: "고객이름" },
    { key: "currency", label: "가격" },
  ];

  const onPageChange = async (newPage: number) => {
    loadOrderData({ page: newPage });
  };

  useEffect(() => {
    loadOrderData({ page: 1 });
  }, []);
  return (
    <div className="App">
      <OrderListTable
        headerColumns={headerColumns}
        data={orderData}
        pagination={
          <Pagination
            {...paginationData}
            onPageChange={onPageChange}
            span={headerColumns.length}
          />
        }
      />
    </div>
  );
}

export default App;
