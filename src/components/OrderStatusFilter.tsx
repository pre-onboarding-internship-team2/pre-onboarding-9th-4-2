import React from "react";
import useQueryString from "../hooks/useQueryString";
import { FilterParams } from "../types/QueryParams";

export function OrderStatusFilter() {
  const { setQueryParams, deleteQueryParams } = useQueryString();
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newValue = e.currentTarget.value;
    if (newValue === "all") {
      deleteQueryParams(["orderStatus"]);
    } else {
      setQueryParams({ orderStatus: newValue as FilterParams["orderStatus"] });
    }
  };
  return (
    <label>
      주문처리상태
      <select onChange={onChange}>
        <option value="all">전체</option>
        <option value="true">완료</option>
        <option value="false">미완료</option>
      </select>
    </label>
  );
}
