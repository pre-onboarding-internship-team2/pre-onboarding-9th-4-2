import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../functions/fetcher";
import { Data } from "../../types/type";
import { pagination } from "../../functions/pagination";

const TableBody = () => {
  const [searchParams] = useSearchParams({ page: "1" });
  const { data } = useSWR("/", fetcher);
  return (
    <tbody>
      {data &&
        pagination(
          data,
          Number(searchParams.get("page")),
          searchParams.get("sort"),
          searchParams.get("keyword") ? searchParams.get("keyword") : null
        ).map((item: Data, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.customer_name}</td>
            <td>{item.customer_id}</td>
            <td>
              {item.status ? (
                <span className="badge badge-success">주문 완료</span>
              ) : (
                <span className="badge badge-error">주문 보류</span>
              )}
            </td>
            <td>{item.currency}</td>
            <td>{item.transaction_time}</td>
          </tr>
        ))}
    </tbody>
  );
};

export default TableBody;
