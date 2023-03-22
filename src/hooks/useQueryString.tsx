import { useSearchParams } from "react-router-dom";
import { OrderData } from "../types/OrderData";

export type OrderDataKey = keyof OrderData;
export type SortOrder = "desc" | "asc";

export interface OrderListQueryParams {
  page?: number;
  sortBy?: OrderDataKey;
  sortOrder?: SortOrder;
}

type QueryParamKey = keyof OrderListQueryParams;

function useQueryString() {
  const [searchParams, setSearchParams] = useSearchParams();

  // TODO as 없이 OrderListQueryParams[key]에 지정된 타입으로 바꾸는 방법 찾기
  // OrderListQueryParams 키 늘어나는 만큼 일일이 입력해야함..
  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : undefined;
  const sortBy = (searchParams.get("sortBy") ||
    undefined) as OrderListQueryParams["sortBy"];
  const sortOrder = (searchParams.get("sortOrder") ||
    undefined) as OrderListQueryParams["sortOrder"];

  function setQueryParams(params: OrderListQueryParams) {
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, value.toString());
    });
    setSearchParams(searchParams);
  }

  function deleteQueryParams(paramKeys: QueryParamKey[]) {
    paramKeys.forEach((key) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  }

  return {
    page,
    sortBy,
    sortOrder,
    setQueryParams,
    deleteQueryParams,
  };
}

export default useQueryString;
