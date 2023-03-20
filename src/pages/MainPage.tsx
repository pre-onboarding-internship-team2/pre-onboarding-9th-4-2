import useSWR from "swr";
import { pagination, totalPageNumber } from "../functions/pagination";
import { fetcher } from "../functions/fetcher";
import { Data } from "../types/type";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const MainPage = () => {
  const { data, error } = useSWR("/", fetcher);
  const [state, setState] = useState<Data[]>([]);
  const [isSortById, setIsSortById] = useState(true);
  const [isSortByStatus, setIsSortByStatus] = useState(false);
  const [isSortByDate, setIsSortByDate] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  if (error) {
    return <div>Something wrong...</div>;
  }
  return (
    <section>
      <article className="flex flex-col items-center">
        <h1 className="text-4xl font-bold my-6">스위치원 주문 목록표</h1>
        <table className="table w-3/4">
          <thead>
            <tr>
              <th
                className="flex"
                onClick={() => {
                  setIsSortByDate(true);
                  setIsSortByStatus(false);
                  setIsSortById(!isSortById);
                  if (isSortById) {
                    setState(
                      state?.sort((a, b) => {
                        return b.id - a.id;
                      })
                    );
                  } else {
                    setState(
                      state?.sort((a, b) => {
                        return a.id - b.id;
                      })
                    );
                  }
                }}
              >
                주문 번호{" "}
                {isSortById ? (
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronUpIcon className="w-4 h-4 ml-1" />
                )}
              </th>
              <th>주문자 이름</th>
              <th>주문자 번호</th>
              <th
                className="flex"
                onClick={() => {
                  setIsSortById(true);
                  setIsSortByDate(true);
                  setIsSortByStatus(!isSortByStatus);
                  const statusTrueArray = state.filter(
                    (item: Data) => item.status === true
                  );
                  const statusFalseArray = state.filter(
                    (item: Data) => item.status === false
                  );
                  if (isSortByStatus) {
                    setState([...statusTrueArray, ...statusFalseArray]);
                  } else {
                    setState([...statusFalseArray, ...statusTrueArray]);
                  }
                }}
              >
                주문 상태{" "}
                {isSortByStatus ? (
                  <ChevronUpIcon className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                )}
              </th>
              <th>주문 가격</th>
              <th
                className="flex"
                onClick={() => {
                  setIsSortById(true);
                  setIsSortByStatus(false);
                  setIsSortByDate(!isSortByDate);
                  if (isSortByDate) {
                    setState(
                      state?.sort((a, b) => {
                        return (
                          new Date(b.transaction_time).getTime() -
                          new Date(a.transaction_time).getTime()
                        );
                      })
                    );
                  } else {
                    setState(
                      state?.sort((a, b) => {
                        return (
                          new Date(a.transaction_time).getTime() -
                          new Date(b.transaction_time).getTime()
                        );
                      })
                    );
                  }
                }}
              >
                주문 일자{" "}
                {isSortByDate ? (
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronUpIcon className="w-4 h-4 ml-1" />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {state &&
              pagination(state, Number(searchParams.get("page"))).map(
                (item: Data, index) => (
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
                )
              )}
          </tbody>
        </table>
        <div className="btn-group my-6">
          {state &&
            Array.from({ length: totalPageNumber(state) }, (v, i) => (
              <button
                className="btn"
                key={i + 1}
                onClick={() =>
                  setSearchParams({ ...searchParams, page: String(i + 1) })
                }
              >
                {i + 1}
              </button>
            ))}
        </div>
      </article>
      )
    </section>
  );
};

export default MainPage;
