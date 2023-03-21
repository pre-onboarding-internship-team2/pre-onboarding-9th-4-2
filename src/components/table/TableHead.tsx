import { useSearchParams } from "react-router-dom";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const TableHead = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <thead>
      <tr>
        <th
          className="flex cursor-pointer"
          onClick={() => {
            if (searchParams.get("sort") === "id_asc") {
              searchParams.set("sort", "id_des");
              setSearchParams(searchParams);
            } else {
              searchParams.set("sort", "id_asc");

              setSearchParams(searchParams);
            }
          }}
        >
          주문 번호{" "}
          {searchParams.get("sort") === "id_des" ? (
            <ChevronUpIcon className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          )}
        </th>
        <th>주문자 이름</th>
        <th>주문자 번호</th>
        <th
          className="flex cursor-pointer"
          onClick={() => {
            if (searchParams.get("sort") === "status_false") {
              searchParams.set("sort", "status_true");
              setSearchParams(searchParams);
            } else {
              searchParams.set("sort", "status_false");

              setSearchParams(searchParams);
            }
          }}
        >
          주문 상태{" "}
          {searchParams.get("sort") === "status_false" ? (
            <ChevronUpIcon className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          )}
        </th>
        <th>주문 가격</th>
        <th
          className="flex cursor-pointer"
          onClick={() => {
            if (searchParams.get("sort") === "date_asc") {
              searchParams.set("sort", "date_des");
              setSearchParams(searchParams);
            } else {
              searchParams.set("sort", "date_asc");
              setSearchParams(searchParams);
            }
          }}
        >
          주문 일자{" "}
          {searchParams.get("sort") === "date_des" ? (
            <ChevronUpIcon className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          )}
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
