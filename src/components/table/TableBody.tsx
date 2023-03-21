import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../functions/fetcher";
import { Data } from "../../types/type";
import { pagination } from "../../functions/pagination";

const TableBody = () => {
  const [searchParams] = useSearchParams({ page: "1" });
  const { data } = useSWR("/", fetcher);
  return (
    <>
      {data &&
      pagination(
        data,
        Number(searchParams.get("page")),
        searchParams.get("sort"),
        searchParams.get("keyword") ? searchParams.get("keyword") : null
      ).length !== 0 ? (
        <tbody>
          {pagination(
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
      ) : (
        <div className="w-max p-6">
          <span className="text-2xl font-semibold text-gray-500">
            검색한 데이터가 존재하지 않습니다.
          </span>
        </div>
      )}
    </>
  );
};

export default TableBody;
