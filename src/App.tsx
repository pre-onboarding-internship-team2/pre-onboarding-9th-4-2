import { useEffect, useState } from "react";
import { getOrderListData } from "./api/getOrderListData";
import type { HeaderColumn } from "./components/OrderListHeaderColumn";
import type { OrderData } from "./types/OrderData";
import OrderListTable from "./components/OrderListTable";
import "./App.style.css";

function App() {
  const [orderData, setOrderData] = useState<OrderData[]>([]);

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

  useEffect(() => {
    const loadOrderData = async () => {
      const data = await getOrderListData();
      setOrderData(data);
    };

    loadOrderData();
  }, []);
  return (
    <div className="App">
      <OrderListTable
        headerColumns={headerColumns}
        data={orderData}
        pagination={<></>}
      />
    </div>
  );
}

export default App;
