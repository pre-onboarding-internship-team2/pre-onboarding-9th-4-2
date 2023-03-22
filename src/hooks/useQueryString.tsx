import { useSearchParams } from "react-router-dom";
import { OrderListQueryParams } from "../types/QueryParams";

type QueryParamKey = keyof OrderListQueryParams;

function useQueryString() {
  const [searchParams, setSearchParams] = useSearchParams();

  // TODO as 없이 OrderListQueryParams[key]에 지정된 타입으로 바꾸는 방법 찾기
  // OrderListQueryParams 키 늘어나는 만큼 일일이 입력해야함..
  const params = {
    page: searchParams.get("page")
      ? Number(searchParams.get("page"))
      : undefined,
    sortBy: (searchParams.get("sortBy") ||
      undefined) as OrderListQueryParams["sortBy"],
    sortOrder: (searchParams.get("sortOrder") ||
      undefined) as OrderListQueryParams["sortOrder"],
    customerName: (searchParams.get("customerName") ||
      undefined) as OrderListQueryParams["customerName"],
    orderStatus: (searchParams.get("orderStatus") ||
      undefined) as OrderListQueryParams["orderStatus"],
  };

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
    params,
    setQueryParams,
    deleteQueryParams,
  };
}

export default useQueryString;
