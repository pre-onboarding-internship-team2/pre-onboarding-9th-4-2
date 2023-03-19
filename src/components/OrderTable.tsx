import { useQuery } from "@tanstack/react-query";
import { fetchGetOrderList } from "../services/order";

export default function OrderTable() {
  const { data: orderList, isSuccess } = useQuery(["order"], fetchGetOrderList);

  return (
    <>
      {isSuccess ? (
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
      ) : (
        "fail"
      )}
    </>
  );
}
