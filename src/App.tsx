import { useEffect, useState } from "react";
import { getOrderListData } from "./api/getOrderListData";
import type { HeaderColumn } from "./components/OrderListHeaderColumn";
import type { OrderData } from "./types/OrderData";
import OrderListTable from "./components/OrderListTable";
import "./App.style.css";
import Pagination from "./components/Pagination";

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

  const displayItemAmountPerPage = 50;
  const [paginationData, setPaginationData] = useState({
    minPage: 1,
    maxPage: 1,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const onPageChange = async (newPage: number) => {
    loadOrderData(newPage);
  };

  const loadOrderData = async (page: number) => {
    const TODAY = "2023-03-08";
    const { data, minPage, maxPage, hasPrevPage, hasNextPage } =
      await getOrderListData({
        date: TODAY,
        itemAmountPerPage: displayItemAmountPerPage,
        page,
      });
    setOrderData(data);
    setPaginationData({
      minPage,
      maxPage,
      hasNextPage,
      hasPrevPage,
    });
  };

  useEffect(() => {
    loadOrderData(1);
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
