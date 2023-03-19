import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  fetchGetOrderList,
  orderApiQueryKey,
  PAGINATION_PER_PAGE,
} from "../services/order";

export default function OrderTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get(orderApiQueryKey.PAGE);
  const { data, isSuccess } = useQuery(
    ["order", page],
    () => fetchGetOrderList(page ?? "1"),
    {
      select: (res) => {
        const totalCount = res.headers["x-total-count"];
        const orderList = res.data;
        return { totalCount, orderList };
      },
    }
  );

  if (isSuccess && !data) throw new Error("success query but no data");
  const { totalCount, orderList } = data!;

  const getPageNumberArray = () => {
    return Array(Math.floor(totalCount / PAGINATION_PER_PAGE))
      .fill(0)
      .map((_, i) => (i + 1).toString());
  };

  return (
    <>
      {isSuccess ? (
        <>
          <table>
            <thead>
              <tr>
                {Object.keys(orderList[0]).map((key) => (
                  <th key={key}>
                    {key
                      .replace("_", " ")
                      .replace(/\b[a-z]/g, (c) => c.toUpperCase())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr key={order.id}>
                  {Object.values(order).map((value) => (
                    <td key={order.id.toString() + value.toString()}>
                      {value.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {getPageNumberArray().map((pageNumber) => (
            <button
              onClick={() => {
                setSearchParams({ [orderApiQueryKey.PAGE]: pageNumber });
              }}
              key={`page ${pageNumber}`}
            >
              {pageNumber}
            </button>
          ))}
        </>
      ) : (
        "fail"
      )}
    </>
  );
}
